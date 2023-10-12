package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/n0-computer/iroh-ffi/iroh"
)

func main() {
	path := "./iroh-go"
	os.MkdirAll(path, 0755)
	node, err := iroh.NewIrohNode(path)
	if err != nil {
		panic(err)
	}

	nodeID := node.NodeId()
	fmt.Printf("Hello from iroh-go! nodeId: %s\n", nodeID)
	role := os.Args[1]
	ticketStr := os.Args[2]
	fmt.Printf("Joining Ticket: %s\n", ticketStr)
	ticket, err := iroh.DocTicketFromString(ticketStr)
	if err != nil {
		panic(err)
	}

	author, err := node.AuthorNew()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created author %s\n", author.ToString())

	doc, err := node.DocJoin(ticket)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Joined document %s\n", doc.Id())

	var handler iroh.SubscribeCallback
	switch role {
	case "worker":
		fmt.Println("I am a worker!")
		handler = &Worker{nodeID: nodeID, doc: doc, author: author}
	case "scheduler":
		fmt.Println("I am a scheduler!")
		handler = &Scheduler{node: node, doc: doc, author: author}
	default:
		fmt.Printf("Invalid role %q", role)
		os.Exit(1)
	}

	if err := doc.Subscribe(handler); err != nil {
		panic(err)
	}

	// block forever
	select {}
}

type Scheduler struct {
	node   *iroh.Node
	doc    *iroh.Doc
	author *iroh.AuthorId
}

func (h *Scheduler) Event(event *iroh.LiveEvent) *iroh.IrohError {
	if event.Type() == iroh.LiveEventTypeInsertRemote {
		insertEvent := event.AsInsertRemote()
		if bytes.HasPrefix(insertEvent.Entry.Key(), []byte("schedule:")) {

			conns, err := h.node.Connections()
			if err != nil {
				fmt.Errorf("Error getting connections: %s\n", err)
				return nil
			}

			var fastestConn *iroh.ConnectionInfo
			for _, conn := range conns {
				if fastestConn == nil || conn.Latency < fastestConn.Latency {
					fastestConn = conn
				}
			}

			if fastestConn == nil {
				fmt.Println("No connections available")
				return nil
			}

			fmt.Printf("scheduling prompt: %q\n", string(insertEvent.Entry.Key()))
			resultKey := bytes.Replace(insertEvent.Entry.Key(), []byte("prompts:"), []byte("results:"), 1)
			resultKey = append(resultKey, []byte(fastestConn.PublicKey.ToString())...)
			h.doc.SetHash(h.author, resultKey, insertEvent.Entry.Hash(), insertEvent.Entry.Size)
		}
	}
}

type Worker struct {
	nodeID string
	doc    *iroh.Doc
	author *iroh.AuthorId
}

func (h *Worker) Event(event *iroh.LiveEvent) *iroh.IrohError {
	if event.Type() == iroh.LiveEventTypeInsertRemote {
		insertEvent := event.AsInsertRemote()
		if bytes.HasPrefix(insertEvent.Entry.Key(), []byte("prompts:")) {
			var content []byte
			var err error
			for i := 0; i < 10; i++ {
				if content, err = h.doc.GetContentBytes(insertEvent.Entry); err != nil {
					fmt.Printf("Error getting content bytes: %s\n", err)
				} else {
					break
				}
				time.Sleep(time.Second)
			}
			if content == nil {
				fmt.Printf("Error getting content bytes: %s\n", err)
				return nil
			}
			fmt.Printf("running prompt: %q\n", string(content))

			openAIApiKey := os.Getenv("OPENAI_API_KEY")
			body := fmt.Sprintf(`{"prompt": %q, "n": 1, "size": "256x256"}`, string(content))
			req, err := http.NewRequest(http.MethodPost, "https://api.openai.com/v1/images/generations", bytes.NewBuffer([]byte(body)))
			if err != nil {
				fmt.Printf("Error creating request: %s\n", err)
				return nil
			}

			req.Header.Add("Content-Type", "application/json")
			req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", openAIApiKey))
			res, err := http.DefaultClient.Do(req)
			if err != nil {
				fmt.Printf("Error making request: %s\n", err)
				return nil
			}

			if res.StatusCode != http.StatusOK {
				body, _ := io.ReadAll(res.Body)
				fmt.Printf("Error making request: %d: %s\n", res.StatusCode, string(body))
				resultKey := bytes.Replace(insertEvent.Entry.Key(), []byte("prompts:"), []byte("errors:"), 1)
				resultKey = append(resultKey, []byte(".json")...)
				if _, err = h.doc.SetBytes(h.author, resultKey, body); err != nil {
					return nil
				}
			}

			apiRes := DallEResponse{}
			if err := json.NewDecoder(res.Body).Decode(&apiRes); err != nil {
				fmt.Printf("Error decoding 200 response: %s\n", err)
				return nil
			}
			fmt.Printf("got response: %v\n", apiRes)

			imageRes, err := http.Get(apiRes.Data[0].Url)
			if err != nil {
				fmt.Printf("Error getting image: %s\n", err)
				return nil
			}

			pngData, err := io.ReadAll(imageRes.Body)
			if err != nil {
				fmt.Printf("Error reading response body: %s\n", err)
				return nil
			}

			fmt.Println("got image, placing in document...")
			localPath := "result.png"
			if err := os.WriteFile(localPath, pngData, 0644); err != nil {
				fmt.Printf("Error writing file: %s\n", err)
				return nil
			}

			resultKey := bytes.Replace(insertEvent.Entry.Key(), []byte("prompts:"), []byte("results:"), 1)
			resultKey = append(resultKey, []byte(".png")...)
			if _, err = h.doc.SetFileBytes(h.author, resultKey, localPath); err != nil {
				return nil
			}

			fmt.Printf("finished prompt: %q\n", string(resultKey))
		}
	}

	return nil
}

type DallEResponse struct {
	Data []DataResponse `json:"data"`
}

type DataResponse struct {
	Url string `json:"url"`
}

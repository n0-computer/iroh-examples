package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"image"
	"image/color"
	"image/draw"
	_ "image/jpeg"
	"image/png"
	"io"
	"log"
	"math"
	"mime/multipart"
	"net/http"
	"os"
	"sync"

	"github.com/disintegration/imaging"
	"github.com/n0-computer/iroh-ffi/iroh"
	"github.com/rwcarlsen/goexif/exif"
	"github.com/rwcarlsen/goexif/tiff"
	xdraw "golang.org/x/image/draw"
)

const prompt = "make this look like a steampunk illustration"

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: dall-e-image-variation <iroh-ticket>")
		os.Exit(1)
	}
	if os.Getenv("OPENAI_API_KEY") == "" {
		fmt.Println("OPENAI_API_KEY must be set")
		os.Exit(1)
	}

	// create a new iroh node. All of it's data will be stored in the `iroh-data` directory
	path := "./iroh-data"
	os.MkdirAll(path, 0755)
	node, err := iroh.NewIrohNode(path)
	if err != nil {
		panic(err)
	}

	nodeID := node.NodeId()
	fmt.Printf("Hello from iroh-go dall-e-image-edits!")
	fmt.Printf("nodeId: %s\n", nodeID)
	ticketStr := os.Args[1]
	fmt.Printf("Joining Ticket: %s\n", ticketStr)
	ticket, err := iroh.DocTicketFromString(ticketStr)
	if err != nil {
		panic(err)
	}

	// create the author that will write results to the document
	author, err := node.AuthorNew()
	if err != nil {
		panic(err)
	}
	fmt.Printf("Created author %s\n", author.ToString())

	// join the document, connecting to the node in the ticket
	doc, err := node.DocJoin(ticket)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Joined document %s\n", doc.Id().ToString())

	// subscribe to the document for changes
	handler := &EventHandler{doc: doc, author: author, lock: sync.Mutex{}, awaiting: map[string]*iroh.Entry{}}
	if err := doc.Subscribe(handler); err != nil {
		panic(err)
	}

	// block forever (press ctrl-c to exit)
	select {}
}

// EventHandler handles events emitted by the document. The Event method implements the
// iroh.SubscribeCallback interface, which iroh will call whenever the document changes
type EventHandler struct {
	doc      *iroh.Doc
	author   *iroh.AuthorId
	lock     sync.Mutex
	awaiting map[string]*iroh.Entry
}

// The primary event handler. Iroh will call this method whenever the document changes.
func (h *EventHandler) Event(event *iroh.LiveEvent) *iroh.IrohError {
	switch event.Type() {
	case iroh.LiveEventTypeSyncFinished:
		// SyncFinished events are emitted when the document is fully synced. At this point we
		// don't know what content we have from each entry (likely nothing), but we know which
		// entries exist.
		// Note this is also only for when we're done syncing with *one* other node. This event will
		// fire once per sync operation, so if you're connected to 3 other nodes, you'll get 3 of
		// these events.
		if err := h.handleSyncFinished(); err != nil {
			log.Printf("Error handling sync finished: %s\n", err)
		}
	case iroh.LiveEventTypeInsertRemote:
		// InsertRemote events are emitted when another author inserts an entry into the document
		// At this point we know about the entry, but we may or may not have the content the entry's
		// content hash refers to.
		// If we don't have the content, we'll get a ContentReady event later. We store prefixes
		// we're intersted in in the `awaiting` map to send to dall-e when we get the content.
		if err := h.handleInsertRemote(event.AsInsertRemote()); err != nil {
			log.Printf("Error handling insert remote: %s\n", err)
		}
	case iroh.LiveEventTypeContentReady:
		// ContentReady events are emitted whenever a hash finishes transferring
		if err := h.handleContentReady(event.AsContentReady()); err != nil {
			log.Printf("Error handling content ready: %s\n", err)
		}
	}

	return nil
}

func (h *EventHandler) handleSyncFinished() error {
	// This is where you can do any initial processing of the document. In this case, we're only
	// going to compute on changes that happen *after* the worker joins the document, but if you
	// also wanted to scan the document for existing images to run through dall-e, this is where
	// you'd do it.
	return nil
}

func (h *EventHandler) handleInsertRemote(event iroh.InsertRemoteEvent) error {
	if bytes.HasSuffix(event.Entry.Key(), []byte(".jpg")) || bytes.HasSuffix(event.Entry.Key(), []byte(".jpeg")) {
		// TODO - check if we have a result for this content already!
		// resultKey := h.resultKey(event.Entry.Key())
		hash := event.Entry.ContentHash()

		// we have the content, skip straight to processing
		if event.ContentStatus == iroh.ContentStatusComplete {
			return h.processImage(event.Entry)
		}

		// no content yet, wait for it
		h.lock.Lock()
		h.awaiting[hash.ToString()] = event.Entry
		h.lock.Unlock()
	}
	return nil
}

func (h *EventHandler) handleContentReady(hash *iroh.Hash) error {
	h.lock.Lock()
	defer h.lock.Unlock()

	if entry, ok := h.awaiting[hash.ToString()]; ok {
		delete(h.awaiting, hash.ToString())
		fmt.Printf("got content for key: %q\n", string(entry.Key()))
		return h.processImage(entry)
	}

	return nil
}

func (h *EventHandler) processImage(entry *iroh.Entry) error {
	jpegBytes, err := h.doc.GetContentBytes(entry)
	if err != nil {
		fmt.Printf("Error getting content bytes: %s\n", err)
		return err
	}
	if jpegBytes == nil {
		fmt.Printf("Error getting content bytes: %s\n", err)
		return nil
	}

	fmt.Printf("running prompt: %q on key: %q with %d bytes.\n", string(prompt), string(entry.Key()), len(jpegBytes))
	pngBuffer, err := resizeJpgToSquarePng(bytes.NewBuffer(jpegBytes), 1000)
	if err != nil {
		fmt.Printf("Error resizing image: %s\n", err)
		return nil
	}

	imageRes, err := createDalleImageEdit(prompt, &pngBuffer)
	if err != nil {
		fmt.Printf("Error resizing image: %s\n", err)
		return nil
	}

	pngData, err := io.ReadAll(imageRes)
	if err != nil {
		fmt.Printf("Error reading response body: %s\n", err)
		return nil
	}

	os.WriteFile("result.png", pngData, 0644)

	resultKey := h.resultKey(entry.Key())
	fmt.Println("got image, setting {}", string(resultKey))

	if _, err = h.doc.SetBytes(h.author, resultKey, pngData); err != nil {
		return nil
	}
	fmt.Printf("finished prompt: %q\n", string(resultKey))
	return nil
}

// the key we'll write results to
func (h *EventHandler) resultKey(key []byte) []byte {
	resultKey := bytes.TrimSuffix(key, []byte(".jpg"))
	resultKey = bytes.TrimSuffix(resultKey, []byte(".jpeg"))
	resultKey = append(resultKey, []byte(".png")...)
	resultKey = append([]byte("dall-e-edit:"), resultKey...)
	return resultKey
}

func resizeJpgToSquarePng(jpegReader *bytes.Buffer, targetSize int) (bytes.Buffer, error) {
	// Decode the JPEG.
	// img, err := jpeg.Decode(jpegReader)
	img, err := openJpegWithExifRotation(jpegReader)
	if err != nil {
		panic(err)
	}
	// Crop the image to a square.
	squareImg := cropToSquare(img)
	// Resize the square image to the desired size.
	resizedImg := resizeImage(squareImg, targetSize, targetSize)

	// Create an RGBA image
	rgbaImg := image.NewNRGBA(resizedImg.Bounds())
	for y := resizedImg.Bounds().Min.Y; y < resizedImg.Bounds().Max.Y; y++ {
		for x := resizedImg.Bounds().Min.X; x < resizedImg.Bounds().Max.X; x++ {
			c := color.NRGBAModel.Convert(resizedImg.At(x, y)).(color.NRGBA)
			rgbaImg.SetNRGBA(x, y, c)
		}
	}

	// dall-e expects equare PNG images with RGBA color channels, to ensure png.Encode doesn't strip
	// out the alpha channel, we need to set at least one pixel to be transparent
	c := rgbaImg.At(0, 0).(color.NRGBA)
	c.A = 0
	rgbaImg.SetNRGBA(0, 0, c)

	pngOut := bytes.Buffer{}
	err = png.Encode(&pngOut, rgbaImg)
	return pngOut, err
}

// openJpegWithExifRotation opens a jpeg image and rotates it according to the exif orientation tag
func openJpegWithExifRotation(jpegReader *bytes.Buffer) (image.Image, error) {
	data := jpegReader.Bytes()
	x, err := exif.Decode(bytes.NewBuffer(data))
	if err != nil {
		// EOF no exif
		log.Print("decoding exif: ", err)
		return nil, err
	}

	tag, err := x.Get(exif.Orientation)
	if err != nil {
		// tag not present
		log.Print("tag not present: ", err)
		return nil, err
	}

	img, _, err := image.Decode(bytes.NewBuffer(data))
	if err != nil {
		log.Print("decoding image: ", err)
		return nil, err
	}

	if tag.Count == 1 && tag.Format() == tiff.IntVal {
		orientation, err := tag.Int(0)
		if err != nil {
			log.Print("decoding orientation: ", err)
			return nil, err
		}

		switch orientation {
		case 3: // rotate 180
			img = imaging.Rotate180(img)
		case 6: // rotate 270
			img = imaging.Rotate270(img)
		case 8: //rotate 90
			img = imaging.Rotate90(img)
		}
	}

	return img, nil
}

// cropToSquare crops the given image to the largest square possible centered on the image.
func cropToSquare(img image.Image) image.Image {
	bounds := img.Bounds()
	size := math.Min(float64(bounds.Dx()), float64(bounds.Dy()))
	startx := (bounds.Dx() - int(size)) / 2
	starty := (bounds.Dy() - int(size)) / 2
	return img.(interface {
		SubImage(r image.Rectangle) image.Image
	}).SubImage(image.Rect(startx, starty, startx+int(size), starty+int(size)))
}

// resizeImage resizes the given image to the specified width and height.
func resizeImage(img image.Image, width, height int) image.Image {
	newImg := image.NewNRGBA(image.Rect(0, 0, width, height))
	xdraw.CatmullRom.Scale(newImg, newImg.Bounds(), img, img.Bounds(), draw.Over, nil)
	return newImg
}

func createDalleImageEdit(prompt string, squarePngImageData *bytes.Buffer) (io.ReadCloser, error) {
	openAIApiKey := os.Getenv("OPENAI_API_KEY")

	var requestBody bytes.Buffer
	multipartWriter := multipart.NewWriter(&requestBody)

	fileWriter, err := multipartWriter.CreateFormFile("image", "image.png")
	if err != nil {
		panic(err)
	}
	// Copy the file into the file field
	_, err = io.Copy(fileWriter, squarePngImageData)
	if err != nil {
		panic(err)
	}

	multipartWriter.WriteField("prompt", prompt)
	multipartWriter.WriteField("n", "1")
	multipartWriter.WriteField("size", "512x512")
	multipartWriter.WriteField("response_format", "url")

	// Close the multipart writer to set the terminating boundary
	multipartWriter.Close()

	// Create the HTTP request
	req, err := http.NewRequest(http.MethodPost, "https://api.openai.com/v1/images/edits", &requestBody)
	if err != nil {
		fmt.Printf("Error creating request: %s\n", err)
		return nil, err
	}

	// Set the content type header to the multipart form's content type
	req.Header.Set("Content-Type", multipartWriter.FormDataContentType())

	// req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", openAIApiKey))
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Error making request: %s\n", err)
		return nil, err
	}

	if res.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(res.Body)
		fmt.Printf("Error making request: %d: %s\n", res.StatusCode, string(body))
	}

	apiRes := DallEResponse{}
	if err := json.NewDecoder(res.Body).Decode(&apiRes); err != nil {
		fmt.Printf("Error decoding 200 response: %s\n", err)
		return nil, err
	}
	fmt.Printf("got response: %v\n", apiRes)

	imageRes, err := http.Get(apiRes.Data[0].Url)
	if err != nil {
		fmt.Printf("Error getting image: %s\n", err)
		return nil, err
	}

	return imageRes.Body, nil
}

type DallEResponse struct {
	Data []DataResponse `json:"data"`
}

type DataResponse struct {
	Url string `json:"url"`
}

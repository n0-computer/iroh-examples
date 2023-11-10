# Dall-E image edit example

This example watches for entries with keys that end in `.jpg` or `.jpeg` suffixes. For any it finds, it will fetch the blob, check if it's a jpg, and if so send it to OpenAI's Dall-E image edits with the prompt "make this look cyberpunk". It will then write the results back to the document as a `.png` image with the prefix `dall-e-edit:`.

## Setup & Requirements

* You'll need a paid subscription to the OpenAI API, and your API key set to the `OPENAI_API_KEY` environment variable.
* You'll need an iroh document to subscribe to, and a .jpg image. You can use the [iroh console](https://iroh.computer/docs/install) for this

## Running the example
* start an iroh console
* run `doc new --switch`
* if you don't have an active author, run `author new --switch`
* run `doc share write`. This will spit out a ticket
* switch to another terminal & `cd` into the `dall-e-image-edit` directory
* set the `OPENAI_API_KEY` env var to your openAi api key `export OPENAI_API_KEY=*******`
* run `go run main.go <ticket>`, where ticket is the output of the `doc share write` command from earlier. The dall-e worker program will join the document
* back at the iroh console run `doc import path/to/image.jpg`, select yes
* you should see the dall-e worker sync the change, and begin processing. after a few seconds the openAI API call will return and the worker will add a key that looks something like `dall-e-worker:path/to/image.png` to the document
* back at the iroh console run `doc keys` to list the keys, find the `dall-e-worker` key
* run `doc export -o result.png <KEY>` to see the file OpenAI created for you

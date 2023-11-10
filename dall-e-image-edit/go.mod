module github.com/n0-computer/iroh-examples/dall-e-image-edit

go 1.21.1

require golang.org/x/image v0.14.0 // indirect

require (
	github.com/disintegration/imaging v1.6.2 // indirect
	github.com/n0-computer/iroh-ffi v0.0.7-0.20230927174552-77938699b905 // indirect
	github.com/rwcarlsen/goexif v0.0.0-20190401172101-9e8deecbddbd // indirect
)

replace github.com/n0-computer/iroh-ffi => ../../iroh-ffi/go

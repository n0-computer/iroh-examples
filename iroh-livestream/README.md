# iroh-livestreamer

Stream video between nodes.

This uses [Media over Quic](https://github.com/kixelated/moq-rs) to transfer `mp4` streams over `iroh-net` QUIC connections.

## Usage

This tool needs `ffmpeg` and `ffplay`. Make sure that these are installed.

Publish a video stream from your camera and default audio input:
```
$ cargo run --release -- pub
Accepting direct subscribe requests on URL:
iroh:nodeaa../dev
```

Subscribe to a video stream and play it in a window:
```
$ cargo run --release -- sub iroh:nodeaa../dev
```


Run a relay
```
$ cargo run --release -- relay
...
Relay URL:
iroh:nodebb../
```

Publish to a relay and do not accept direct connections:
```
$ cargo run --release -- pub iroh:nodebb../mystream --no-accept
```

Subscribe to a stream from a relay works the same as subscribing to a publisher directly:
```
$ cargo run --release -- sub iroh:nodebb../mystream
```

Overview:
```
$ cargo run --release
Commands:
  pub           Publish a video stream
  sub           Subscribe and play a video stream
  relay         Run a relay
  pipe-loop     Local pipethrough through direct pipe
  network-loop  Local pipethrough through iroh-net
  help          Print this message or the help of the given subcommand(s)

Options:
  -s, --secret-key <SECRET_KEY>
  -h, --help                     Print help

$ cargo run --release -- help pub
Publish a video stream

Usage: iroh-livestream pub [OPTIONS] [RELAYS]...

Arguments:
  [RELAYS]...
          Relays to publish to (must be cast tickets)

Options:
  -i, --input <INPUT>
          Input

          [default: camera]

          Possible values:
          - camera:  Camera and default audio
          - desktop: Desktop and default audio
          - stdin:   Receive a video file from stdin

  -n, --no-accept
          Do not accept direct connections and only publish to relays

  -h, --help
          Print help (see a summary with '-h')

$ cargo run --release -- help sub
Subscribe and play a video stream

Usage: iroh-livestream sub [OPTIONS] <URL>

Arguments:
  <URL>
          Iroh URL to video stream

Options:
  -o, --output <OUTPUT>
          [default: ffplay]

          Possible values:
          - ffplay: Render with ffplay
          - mpv:    Render with mpv
          - stdout: Pipe mp4 to stdout

  -h, --help
          Print help (see a summary with '-h')
```


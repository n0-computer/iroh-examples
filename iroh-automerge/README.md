# iroh-automerge

> Integration of iroh with [automerge](https://automerge.org).


## Running

```sh
# First Terminal
> cargo run
Running
Node Id: t4xj3pbb2fzkmphnu5npfznpir62i5zxacbgywf22ev5w4sjelma
https://euw1-1.derp.iroh.network./
```

```sh
# Second Terminal
> cargo run -- --remote-id t4xj3pbb2fzkmphnu5npfznpir62i5zxacbgywf22ev5w4sjelma --remote-derper 'https://euw1-1.derp.iroh.network./'`
Running
Node Id: dhdgta6lsyya2ms66cndoxbkoiv3kgkmu4dfe2awzeqh6hsfmwlq
https://euw1-1.derp.iroh.network./
State
key-0 => "value-0"
key-1 => "value-1"
key-2 => "value-2"
key-3 => "value-3"
key-4 => "value-4"
```

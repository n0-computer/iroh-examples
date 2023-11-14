# iroh-to-kubo replication

this service backs the "replicate to kubo" feature in iroh.network. When active, blobs added to an anchor are translated & served to the kubo IPFS network.

Here's the general lifecycle of that service:

### Part 0: the `iroh-kubo` service
* `iroh-kubo` has a connection to the postgres database.
* It's available over HTTP & UDP to the anchor nodes, does _not_ need to be exposed to the frontend.
* A copy of the kubo binary is assumed to be running on the same machine. we run `iroh-kubo` as a separate service, because kubo nomnomnom resources & we don't want that taking down anything other than kubo replication
* `iroh-kubo` & the kubo instance share access to the same local filesystem

### Part 1: User activates the "kubo replication" config option in `iroh-anchor`
1. an `iroh-anchor` instance creates a new document, names it `iroh-kubo`
2. the anchor instance creates a "join with write" ticket for the new `iroh-kubo` document: `doc share write`
3. anchor sends that ticket to the `iroh-kubo` service via a `HTTP POST $KUBO_REPLICATION_URL/join` call.
4. the anchor writes the ID of the replication document to `$IROH_DATA_DIR/iroh-kubo.txt`, will check there on process restart and re-initialize blob syncing.
5. In the `/join` handler, `iroh-kubo` adds the document ID to the `kubo_replication_anchors` table in Postgres
6. `iroh-kubo` joins the document & waits for blobs on an event subscription.

### Part2: `iroh-anchor` acquires a blob & has kubo replication turned on 
1. `iroh-anchor` adds the blob to the `iroh-kubo` document: `doc set replicate:iroh:$CID $HASH`, where `$CID` is the _iroh_ CID of the blob.
2. `iroh-kubo` (hopefully) syncs, pulls the content from the given `iroh-anchor`.
3. the `iroh-kubo` event listener calls out to [$KUBO_API_URL add](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-add) with the following params: `?pin=true&hash=blake3&raw-leaves=true`

4. Extract the `Hash` field of the [response](https://docs.ipfs.tech/reference/kubo/rpc/#api-v0-add), and embed it in a _mapping_:
```json
{
  "iroh": "bafkr4ia7uxxfouaxdmumefmah6subqnqnyiel5j2o5ckdycdx56ozdung4",
  "kubo": "QmWVQcAtknigUTYM7iEyQb9im9qf5zLh3rqLv7dNuCTztV",
}
```
5. serialize that mapping to JSON & write the JSON bytes to the replication document `replicate:mapping:$CID` where $CID is the _iroh_ CID of the JSON bytes.
6. add this translation to a `kubo_replication` table.

### Part 3: Displaying in the UI
1. All kubo replication listing goes in the "content" page of the anchor UI for now
2. the `iroh-anchor` instance uses a subscription to the `iroh-kubo` doc to build up a `HashMap<IrohHash,KuboCid>` cache of mappings on the local machine.
3. For now just smash that entire mapping into the frontend & let it do the matching. It'll be accessible on a `/api/content/kubo-mappings` endpoint.

### Part 4: Billing
* TODO - we'll figure this one out later. For now kubo replication will be free while we make the service reliable. With that said, margins on this service should be high because running kubo is painful.


## Open questions
* Q: iroh docs aren't reliable message queues. Stuff is going to get missed.
  A: Yep. Let's just run a periodic check on both sides.
* Q: how are we going to keep this node from peering with nodes other than iroh anchors?
  A: I have no idea. Don't care rn.
* Q: How are we going to do inter-box security? shouldn't all the anchors have a shared secret for talking to `iroh-kubo`?
  A: Sounds like a great idea.
* Q: Shouldn't all of these be github issues on iroh.network?
  A: Yes. You should make those & then PR to remove this section of the readme
* Q: this is keeping two copies of the same data on the iroh-kubo box.
  A: Yes. I'd very much like to use the `nocopy=true` param on add, but need some method for getting the iroh blobstore path
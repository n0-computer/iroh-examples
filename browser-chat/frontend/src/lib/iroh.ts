import type { API, ChannelInfo, Message, PeerInfo, SubscribeCb, TicketOpts } from "./api"
import { log } from "./log"
import { ChatNode, Channel as IrohChannel } from "chat-browser"

type ChannelState = {
  label: string
  messages: Message[]
  peers: Map<string, PeerInfo>
  channel: IrohChannel
  subscribers: SubscribeCb[]
  neighborSubscribers: ((neighbors: number) => void)[]
  neighbors: number
  nextId: number
  onClose: (() => void)
}

export class IrohAPI implements API {
  private chatNode: ChatNode
  private channels: Map<string, ChannelState> = new Map()

  private constructor(chatNode: ChatNode) {
    this.chatNode = chatNode
  }

  static async create(): Promise<IrohAPI> {
    log.info("spawning iroh node")
    const chatNode = await ChatNode.spawn()
    log.info(`node spawned. node id: ${chatNode.node_id()}`)
    return new IrohAPI(chatNode)
  }

  async createChannel(nickname: string): Promise<ChannelInfo> {
    const channel = this.chatNode.create(nickname)
    return this.joinInner(channel, nickname)
  }

  async joinChannel(ticket: string, nickname: string): Promise<ChannelInfo> {
    const channel = this.chatNode.join(ticket, nickname)
    return this.joinInner(channel, nickname)
  }

  joinInner(channel: IrohChannel, nickname: string) {
    const id = channel.id()
    log.info(`joining channel ${id}`)
    const label = id.substring(5, 13)
    let onClose
    let onClosePromise = new Promise<void>(resolve => {
      onClose = resolve
    })
    const state: ChannelState = {
      label,
      messages: [],
      channel,
      subscribers: [],
      peers: new Map(),
      nextId: 0,
      neighbors: 0,
      neighborSubscribers: [],
      onClose: onClose!
    }
    const nodeId = this.chatNode.node_id()
    state.peers.set(nodeId, {
      id: nodeId,
      name: nickname,
      lastSeen: new Date(),
      status: "online"
    })
    this.channels.set(id, state)

    const subscribe = async () => {
      for await (const event of (channel.receiver as unknown as AsyncIterable<ChatEvent>)) {
        console.log("chat event", event)
        if (event.type === "messageReceived") {
          const peerInfo: PeerInfo = {
            id: event.from,
            name: event.nickname,
            lastSeen: new Date(event.sentTimestamp / 1000),
            status: "online"
          }
          state.peers.set(event.from, peerInfo)
          const message: Message = {
            id: nextId(state),
            sender: event.from,
            content: event.text,
          }
          state.messages.push(message)
          const messageWithName = withName(state, message)
          for (const sub of state.subscribers) {
            sub(messageWithName)
          }
        } else if (event.type === "presence") {
          const peerInfo: PeerInfo = {
            id: event.from,
            name: event.nickname,
            lastSeen: new Date(event.sentTimestamp / 1000),
            status: "online"
          }
          state.peers.set(event.from, peerInfo)
        } else if (event.type === "joined") {
          log.info(`joined channel ${id}`)
          state.neighbors += event.neighbors.length
        } else if (event.type === "neighborUp") {
          state.neighbors += 1
        } else if (event.type === "neighborDown") {
          state.neighbors -= 1
        }
      }
    }

    const checkPeers = async () => {
      while (true) {
        const now = new Date()
        for (const peer of state.peers.values()) {
          if (peer.id === nodeId) {
            peer.lastSeen = now
            continue
          }
          const diff = (now.getTime() - peer.lastSeen.getTime()) / 1000;
          if (diff > 20) {
            peer.status = "offline"
          } else if (diff > 10) {
            peer.status = "away"
          } else {
            peer.status = "online"
          }
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    Promise.race([
      onClosePromise,
      subscribe(),
      checkPeers()
    ])

    return { id, name: label }
  }

  getTicket(channelId: string, opts: TicketOpts) {
    const state = this.channels.get(channelId)
    if (!state) {
      throw new Error("Channel not found")
    }
    return state.channel.ticket(opts)
  }

  async closeChannel(channelId: string): Promise<void> {
    const state = this.channels.get(channelId)
    if (!state) {
      throw new Error("Channel not found")
    }
    state.onClose()
    this.channels.delete(channelId)
  }


  async sendMessage(channelId: string, text: string): Promise<void> {
    const state = this.channels.get(channelId)
    if (!state) {
      throw new Error("Channel not found")
    }
    await state.channel.sender.broadcast(text)
    const me = this.chatNode.node_id();
    const message = {
      sender: me,
      id: nextId(state),
      content: text
    }
    state.messages.push(message)
    const messageWithName = withName(state, message)
    for (const sub of state.subscribers) {
      sub(messageWithName)
    }
  }


  async getMessages(channelId: string): Promise<Message[]> {
    const state = this.channels.get(channelId)
    if (!state) {
      throw new Error("Channel not found")
    }
    const messages = state.messages.map(message => withName(state, message))
    return messages
  }

  async getPeers(
    channelId: string,
  ): Promise<PeerInfo[]> {
    const state = this.channels.get(channelId)
    if (!state) {
      throw new Error("Channel not found")
    }
    return Array.from(state.peers.values())
  }

  subscribeToMessages(
    channelId: string,
    callback: (message: Message) => void,
  ): () => void {
    const state = this.channels.get(channelId)
    if (!state) {
      throw new Error("Channel not found")
    }
    state.subscribers.push(callback)
    return () => {
      state.subscribers = state.subscribers.filter(cb => cb != callback)
    }
  }

  subscribeToNeighbors(channelId: string, callback: (neighbors: number) => void): () => void {
    const state = this.channels.get(channelId)
    if (!state) {
      throw new Error("Channel not found")
    }
    callback(state.neighbors)
    state.neighborSubscribers.push(callback)
    return () => {
      state.neighborSubscribers = state.neighborSubscribers.filter(cb => cb != callback)
    }
  }

  subscribeToPeers(
    channelId: string,
    callback: (peers: PeerInfo[]) => void,
  ): () => void {
    // Iroh doesn't provide a way to subscribe to peer updates, so we'll simulate it with a polling mechanism
    const intervalId = setInterval(async () => {
      const peers = await this.getPeers(channelId)
      callback(peers)
    }, 1000) // Poll every second

    return () => {
      clearInterval(intervalId)
    }
  }
}

function getName(state: ChannelState, from: string) {
  const peer = state.peers.get(from)
  if (peer && peer.name) return peer.name
  return from.substring(0, 8)
}

function withName(state: ChannelState, message: Message): Message {
  return { ...message, nickname: getName(state, message.sender) }
}

function nextId(state: ChannelState): string {
  const id = "" + state.nextId
  state.nextId = state.nextId + 1
  return id
}

// Export a function to create and initialize the IrohAPI
export async function createIrohAPI(): Promise<API> {
  return await IrohAPI.create()
}

// types used in chat-browser, for now they are defined manually here.
type JoinedEvent = {
  type: "joined"
  neighbors: string[]
}

type MessageEvent = {
  type: "messageReceived"
  from: string,
  text: string,
  nickname: string,
  sentTimestamp: number,
}

type PresenceEvent = {
  type: "presence"
  from: string,
  nickname: string,
  sentTimestamp: number,
}

type NeighborUpEvent = {
  type: "neighborUp"
  nodeId: string
}

type NeighborDownEvent = {
  type: "neighborDown"
  nodeId: string
}

type LaggedEvent = {
  type: "lagged"
}

type ChatEvent = JoinedEvent | MessageEvent | NeighborUpEvent | NeighborDownEvent | PresenceEvent | LaggedEvent

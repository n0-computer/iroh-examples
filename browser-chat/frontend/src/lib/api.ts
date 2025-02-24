import { log } from './log'

// We want to only ever create the API once, therefore we define a module-level
// singleton that holds the promise to create the API.
// As promises can be awaited any number of times in JavaScript, this gives us
// an async singleton instance to the wasm API.
const api = importAndInitOnce()

export async function initApi() {
  return await api
}

async function importAndInitOnce() {
  try {
    log.info("Importing WASM module")
    const { IrohAPI } = await import('./iroh')
    return await IrohAPI.create()
  } catch (err) {
    log.error('Failed to import or launch iroh', err)
    throw err
  }
}

export interface API {
  createChannel(nickname: string): Promise<ChannelInfo>
  joinChannel(ticket: string, nickname: string): Promise<ChannelInfo>
  sendMessage(channelId: string, message: string): Promise<void>
  getMessages(channelId: string): Promise<Message[]>
  getPeers(channelId: string): Promise<PeerInfo[]>
  subscribeToMessages(
    channelId: string,
    callback: (message: Message) => void,
  ): () => void
  subscribeToPeers(
    channelId: string,
    callback: (peers: PeerInfo[]) => void,
  ): () => void
  subscribeToNeighbors(
    channelId: string,
    callback: (neighbors: number) => void,
  ): () => void
  getTicket(channelId: string, opts: TicketOpts): string
  closeChannel(channelId: string): Promise<void>
}

export type SubscribeCb = (message: Message) => void;

export type ChannelInfo = {
  id: string
  name: string
}

export type TicketOpts = {
  includeMyself: boolean
  includeBootstrap: boolean
  includeNeighbors: boolean
}

export interface Message {
  id: string; sender: string; content: string, nickname?: string
}

export interface PeerInfo {
  id: string
  name: string
  status: "online" | "away" | "offline"
  lastSeen: Date
}

// import { MockAPI } from "./mock"
import { IrohAPI } from "./iroh"

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

export interface API {
  createChannel(name: string, nickname: string): Promise<ChannelInfo>
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

export const api = await IrohAPI.create()

// Log system
export type LogLevel = "info" | "warn" | "error"

export type LogMessage = {
  timestamp: Date
  level: LogLevel
  message: string
}

export type SubscribeCb = (message: Message) => void;

class LogSystem {
  private logs: LogMessage[] = []
  private subscribers: Set<(log: LogMessage) => void> = new Set()

  error(message: any) {
    console.error(message)
    this.info(String(message), "error")
  }

  info(message: string, level: LogLevel = "info") {
    const logMessage: LogMessage = {
      timestamp: new Date(),
      level,
      message,
    }
    this.logs.push(logMessage)
    this.notifySubscribers(logMessage)
  }

  getLogs(): LogMessage[] {
    return this.logs
  }

  subscribe(callback: (log: LogMessage) => void): () => void {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  private notifySubscribers(log: LogMessage) {
    this.subscribers.forEach((callback) => callback(log))
  }
}

export const log = new LogSystem()

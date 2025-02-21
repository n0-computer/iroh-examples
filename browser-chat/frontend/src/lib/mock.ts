import { type API, type ChannelInfo, type TicketOpts } from "./api"
import { log } from "./log"

export class MockAPI implements API {
  private channels: Map<string, { name: string; messages: { id: string; sender: string; content: string }[] }> =
    new Map()
  private peers: { id: string; name: string; status: "online" | "away" | "offline"; lastSeen: Date }[] = [
    { id: "peer1", name: "Alice", status: "online", lastSeen: new Date() },
    { id: "peer2", name: "Bob", status: "away", lastSeen: new Date(Date.now() - 5 * 60 * 1000) },
    { id: "peer3", name: "Charlie", status: "offline", lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  ]
  private messageSubscribers: Map<string, Set<(message: { id: string; sender: string; content: string }) => void>> =
    new Map()
  private peerSubscribers: Map<
    string,
    Set<(peers: { id: string; name: string; status: "online" | "away" | "offline"; lastSeen: Date }[]) => void>
  > = new Map()

  constructor() {
    // Simulate incoming messages every 2 seconds
    setInterval(() => {
      this.channels.forEach((channel, channelId) => {
        const newMessage = {
          id: Math.random().toString(36).substring(2, 15),
          sender: this.peers[Math.floor(Math.random() * this.peers.length)].name,
          content: `Random message ${Math.random().toString(36).substring(2, 8)}`,
        }
        channel.messages.push(newMessage)
        this.notifyMessageSubscribers(channelId, newMessage)
        log.info(`New message in channel ${channelId}: ${newMessage.content}`, "info")
      })
    }, 2000)

    // Simulate peer status changes every 5 seconds
    setInterval(() => {
      this.peers.forEach((peer) => {
        peer.status = Math.random() > 0.5 ? "online" : Math.random() > 0.5 ? "away" : "offline"
        peer.lastSeen = new Date()
      })
      this.channels.forEach((_, channelId) => {
        this.notifyPeerSubscribers(channelId, this.peers)
      })
      log.info("Peer statuses updated", "info")
    }, 5000)
  }

  async createChannel(name: string): Promise<ChannelInfo> {
    const id = Math.random().toString(36).substring(2, 15)
    this.channels.set(id, { name, messages: [] })
    log.info(`Channel created: ${name} with id: ${id}`, "info")
    return { id, name }
  }

  async joinChannel(ticket: string): Promise<ChannelInfo> {
    const channel = Array.from(this.channels.entries()).find(([_, c]) => c.name === ticket)
    if (!channel) {
      log.info(`Failed to join channel: Channel not found for ticket ${ticket}`, "error")
      throw new Error("Channel not found")
    }
    const [id, { name }] = channel
    log.info(`Joined channel with id: ${id}`, "info")
    return { id, name }
  }

  async sendMessage(channelId: string, message: string): Promise<void> {
    const channel = this.channels.get(channelId)
    if (!channel) {
      log.info(`Failed to send message: Channel not found for ID ${channelId}`, "error")
      throw new Error("Channel not found")
    }
    const newMessage = {
      id: Math.random().toString(36).substring(2, 15),
      sender: "You",
      content: message,
    }
    channel.messages.push(newMessage)
    this.notifyMessageSubscribers(channelId, newMessage)
    log.info(`Message sent in channel ${channelId}: ${message}`, "info")
  }

  async getMessages(channelId: string): Promise<{ id: string; sender: string; content: string }[]> {
    const channel = this.channels.get(channelId)
    if (!channel) {
      log.info(`Failed to get messages: Channel not found for ID ${channelId}`, "error")
      throw new Error("Channel not found")
    }
    log.info(`Retrieved messages for channel ${channelId}`, "info")
    return channel.messages
  }

  async getPeers(
    channelId: string,
  ): Promise<{ id: string; name: string; status: "online" | "away" | "offline"; lastSeen: Date }[]> {
    log.info(`Retrieved peers for channel ${channelId}`, "info")
    return this.peers
  }

  subscribeToMessages(
    channelId: string,
    callback: (message: { id: string; sender: string; content: string }) => void,
  ): () => void {
    if (!this.messageSubscribers.has(channelId)) {
      this.messageSubscribers.set(channelId, new Set())
    }
    this.messageSubscribers.get(channelId)!.add(callback)
    log.info(`Subscribed to messages for channel ${channelId}`, "info")
    return () => {
      this.messageSubscribers.get(channelId)?.delete(callback)
      log.info(`Unsubscribed from messages for channel ${channelId}`, "info")
    }
  }

  subscribeToPeers(
    channelId: string,
    callback: (peers: { id: string; name: string; status: "online" | "away" | "offline"; lastSeen: Date }[]) => void,
  ): () => void {
    if (!this.peerSubscribers.has(channelId)) {
      this.peerSubscribers.set(channelId, new Set())
    }
    this.peerSubscribers.get(channelId)!.add(callback)
    log.info(`Subscribed to peers for channel ${channelId}`, "info")
    return () => {
      this.peerSubscribers.get(channelId)?.delete(callback)
      log.info(`Unsubscribed from peers for channel ${channelId}`, "info")
    }
  }

  getTicket(channelId: string, _opts: TicketOpts): string {
    const channel = this.channels.get(channelId)
    if (!channel) {
      log.info(`Failed to get ticket: Channel not found for ID ${channelId}`, "error")
      throw new Error("Channel not found")
    }
    // In a real implementation, this would generate a proper ticket based on the options
    const ticket = `${channel.name}-${Math.random().toString(36).substring(2, 8)}`
    log.info(`Generated ticket for channel ${channelId}: ${ticket}`, "info")
    return ticket
  }

  async closeChannel(channelId: string): Promise<void> {
    if (!this.channels.has(channelId)) {
      log.info(`Failed to close channel: Channel not found for ID ${channelId}`, "error")
      throw new Error("Channel not found")
    }
    this.channels.delete(channelId)
    this.messageSubscribers.delete(channelId)
    this.peerSubscribers.delete(channelId)
    log.info(`Closed channel ${channelId}`, "info")
  }

  private notifyMessageSubscribers(channelId: string, message: { id: string; sender: string; content: string }) {
    this.messageSubscribers.get(channelId)?.forEach((callback) => callback(message))
  }

  private notifyPeerSubscribers(
    channelId: string,
    peers: { id: string; name: string; status: "online" | "away" | "offline"; lastSeen: Date }[],
  ) {
    this.peerSubscribers.get(channelId)?.forEach((callback) => callback(peers))
  }

  subscribeToNeighbors(_channelId: string, _callback: (neighbors: number) => void): () => void {
    return () => { }
  }
}

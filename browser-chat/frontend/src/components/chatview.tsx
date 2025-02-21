"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowDown } from "lucide-react"
import { api, Message, PeerInfo } from "../lib/api"
import { log } from "../lib/log"

interface ChatViewProps {
  channel: string
  onClose: () => void
}

export default function ChatView({ channel, onClose: _ }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [peers, setPeers] = useState<PeerInfo[]>([])
  const [neighbors, setNeighbors] = useState(0)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    setShowScrollButton(false)
    setIsScrolledToBottom(true)
  }, [])

  useEffect(() => {
    return api.subscribeToNeighbors(channel, setNeighbors)
  }, [channel])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await api.getMessages(channel)
        setMessages(fetchedMessages)
        scrollToBottom()
      } catch (error) {
        log.info(`Failed to fetch messages: ${error}`, "error")
      }
    }

    const fetchPeers = async () => {
      try {
        const fetchedPeers = await api.getPeers(channel)
        setPeers(fetchedPeers)
      } catch (error) {
        log.info(`Failed to fetch peers: ${error}`, "error")
      }
    }

    fetchMessages()
    fetchPeers()

    // Subscribe to new messages
    const unsubscribeMessages = api.subscribeToMessages(channel, (newMessage) => {
      setMessages((prevMessages) => {
        // Check if the message already exists to prevent duplicates
        if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
          const updatedMessages = [...prevMessages, newMessage]
          if (isScrolledToBottom) {
            setTimeout(scrollToBottom, 0)
          } else {
            setShowScrollButton(true)
          }
          return updatedMessages
        }
        return prevMessages
      })
      log.info(`New message received: ${newMessage.content}`, "info")
    })

    // Subscribe to peer updates
    const unsubscribePeers = api.subscribeToPeers(channel, (updatedPeers) => {
      setPeers(updatedPeers)
    })

    // Cleanup function
    return () => {
      unsubscribeMessages()
      unsubscribePeers()
    }
  }, [channel, isScrolledToBottom, scrollToBottom])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      try {
        await api.sendMessage(channel, inputMessage.trim())
        setInputMessage("")
        log.info(`Message sent in channel ${channel}: ${inputMessage.trim()}`, "info")
      } catch (error) {
        log.info(`Failed to send message: ${error}`, "error")
      }
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: PeerInfo["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const sortedPeers = [...peers].sort((a, b) => {
    const statusOrder = { online: 0, away: 1, offline: 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  const handleScroll = useCallback(() => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10
      setIsScrolledToBottom(isBottom)
      setShowScrollButton(!isBottom)
    }
  }, [])

  useEffect(() => {
    if (isScrolledToBottom) {
      scrollToBottom()
    }
  }, [isScrolledToBottom, scrollToBottom])

  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll)
      return () => scrollArea.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <div className="flex flex-grow overflow-hidden">
      <div className="flex-grow flex flex-col p-4 relative">
        <ScrollArea className="flex-grow mb-4 border rounded-md p-4" ref={scrollAreaRef} onScroll={handleScroll}>
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-bold">{msg.nickname || msg.sender.substring(0, 8)}: </span>
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
        {showScrollButton && (
          <Button className="absolute bottom-20 right-4 rounded-full p-2" onClick={scrollToBottom} size="icon">
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit">
            Send
          </Button>
        </form>
      </div>
      <div className="w-1/4 p-4 border-l">
        <div className="mb-4">
          <h2 className="font-bold mb-2">Status</h2>
          {!!neighbors && (
            <p>Connected ({neighbors} neighbors)</p>
          )}
          {!neighbors && (
            <p>Waiting for peers</p>
          )}
        </div>
        <h2 className="font-bold mb-2">Peers</h2>
        <ScrollArea className="h-[calc(100%-6rem)]">
          {sortedPeers.map((peer) => (
            <Popover key={peer.id}>
              <PopoverTrigger asChild>
                <div className="flex items-center mb-2 cursor-pointer">
                  <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(peer.status)}`}></div>
                  <span>{peer.name}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="space-y-2">
                  <p>
                    <strong>Last seen:</strong> {peer.lastSeen.toLocaleString()}
                  </p>
                  <div>
                    <strong>Node ID:</strong>
                    <span className="ml-2">{peer.id.substring(0, 8)}...</span>
                    <Button size="sm" onClick={() => copyToClipboard(peer.id)} className="ml-2">
                      Copy
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

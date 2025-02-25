"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import TimeAgo from 'react-timeago'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowDown, ChevronLeft, Settings } from "lucide-react"
import { type API, Message, PeerInfo, PeerRole } from "../lib/api"
import { log } from "../lib/log"
import clsx from "clsx"
import { LeaveChannelButton } from "./leave-channel-button"
import { ChangeNicknameButton } from "./change-nickname-button"

import { useIsDesktop } from "@/hooks/use-media-query"
import { Toggle } from "./ui/toggle"
import { InviteButton } from "./invitepopup"

interface ChatViewProps extends MessageViewProps {
  api: API
  channel: string
  onClose: () => void
}

export default function ChatView({ api, channel, onClose }: ChatViewProps) {
  const isDesktop = useIsDesktop()
  const [showMeta, setShowMeta] = useState(false)
  const cls = clsx(
    "flex flex-grow overflow-hidden",
  )
  let extraButtons
  if (!isDesktop) {
    extraButtons = (
      <Toggle pressed={showMeta} onPressedChange={setShowMeta} title="peers and settings">
        {!showMeta && <Settings />}
        {showMeta && <ChevronLeft />}
      </Toggle>
    )
  }
  return (
    <div className={cls}>
      {(isDesktop || !showMeta) && (
        <MessageView api={api} channel={channel} extraButtons={extraButtons} />
      )}
      {(isDesktop) && (
        <div className="w-md">
          <Meta api={api} channel={channel} onClose={onClose} />
        </div>
      )}
      {(showMeta) && <Meta api={api} channel={channel} onClose={onClose} extraButtons={extraButtons} />}
    </div>
  )
}

interface MessageViewProps {
  api: API
  channel: string
  extraButtons?: React.ReactElement
}

export function MessageView({ api, channel, extraButtons }: MessageViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
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
    setMessages(api.getMessages(channel))
    scrollToBottom()

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
      log.info(`New message received: ${newMessage.content}`)
    })


    // Cleanup function
    return unsubscribeMessages
  }, [channel, isScrolledToBottom, scrollToBottom])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      try {
        await api.sendMessage(channel, inputMessage.trim())
        setInputMessage("")
        log.info(`Message sent in channel ${channel}: ${inputMessage.trim()}`)
      } catch (error) {
        log.error('Failed to send message', error)
      }
    }
  }

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
        {extraButtons}
      </form>
    </div>
  )
}

function Meta({ api, channel, onClose, extraButtons }: ChatViewProps & { extraButtons?: React.ReactElement }) {
  const [peers, setPeers] = useState<PeerInfo[]>([])
  const [neighbors, setNeighbors] = useState(0)
  useEffect(() => {
    return api.subscribeToNeighbors(channel, setNeighbors)
  }, [channel])

  useEffect(() => {
    setPeers([...api.getPeers(channel)])
    return api.subscribeToPeers(channel, () => setPeers([...api.getPeers(channel)]))
  }, [channel])
  const sortedPeers = [...peers].sort((a, b) => {
    const statusOrder = { online: 0, away: 1, offline: 2 }
    return statusOrder[a.status] - statusOrder[b.status]
  })

  return (
    <div className="p-4 border-l flex flex-col">
      <div>
        {extraButtons}
      </div>
      <div className="mb-4">
        <h2 className="font-bold mb-2">Status</h2>
        {neighbors > 0 && (
          <p>Connected <span className="text-sm">({neighbors} neighbors)</span></p>
        )}
        {neighbors === 0 && (
          <p>Waiting for peers</p>
        )}
      </div>
      <div className="mb-4 flex space-x-2">
        <InviteButton channel={channel} getTicket={opts => api.getTicket(channel, opts)} />
      </div>
      <div className="mb-4 flex space-x-2">
        <ChangeNicknameButton api={api} channel={channel} />
        <LeaveChannelButton onConfirm={onClose} />
      </div>
      <h2 className="font-bold mb-2">Peers</h2>
      <div className="flex-grow">
        <ScrollArea className="h-full">
          {sortedPeers.map((peer) => (
            <Peer peer={peer} key={peer.id} />
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}



interface PeerProps {
  peer: PeerInfo
}

function Peer({ peer }: PeerProps) {
  const isMyself = peer.role == PeerRole.Myself
  const popoverContent = isMyself ? <MyselfInfo peer={peer} /> :
    <RemotePeerInfo peer={peer} />
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center mb-2 cursor-pointer">
          <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(peer.status)}`}></div>
          <span className={clsx(isMyself && 'italic')}>{peer.name}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-secondary">
        {popoverContent}
      </PopoverContent>
    </Popover>
  )
}

function MyselfInfo({ peer }: PeerProps) {
  return (
    <div className="space-y-2">
      This is us :)
      <div>
        <strong>Node ID:</strong>
        <NodeId nodeId={peer.id} />
      </div>
    </div>
  )
}

function RemotePeerInfo({ peer }: PeerProps) {
  return (
    <div className="space-y-2">
      <p>
        <strong>Last seen:</strong> <TimeAgo date={peer.lastSeen} />
      </p>
      <div>
        <strong>Node ID:</strong>
        <NodeId nodeId={peer.id} />
      </div>
    </div>
  )
}

interface NodeIdProps {
  nodeId: string
}

function NodeId({ nodeId }: NodeIdProps) {
  return (
    <>
      <span className="ml-2 font-mono">{nodeId.substring(0, 8)}…</span>
      <Button size="sm" onClick={() => copyToClipboard(nodeId)} className="ml-2 inline" variant="outline">
        Copy
      </Button>
    </>
  )
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

function getStatusColor(status: PeerInfo["status"]) {
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

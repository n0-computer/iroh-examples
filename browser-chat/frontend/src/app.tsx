"use client"

import { useState, useEffect } from "react"
import HomeScreen from "./components/homescreen"
import ChatView from "./components/chatview"
import Header from "./components/header"
import LogView from "./components/logview"
import Sidebar from "./components/sidebar"
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { InvitePopup } from "./components/invitepopup"
import { api, type ChannelInfo } from "./lib/api"
import { log } from "./lib/log"
import { generate as generateName } from 'yet-another-name-generator'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default function App() {
  // ... (previous state declarations)
  const [currentView, setCurrentView] = useState<"home" | "chat">("home")
  const [channels, setChannels] = useState<ChannelInfo[]>([])
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [neighbors, setNeighbors] = useState(0)
  const [showLogView, setShowLogView] = useState(false)
  const [nickname, setNickname] = useState(generateName())
  const [logs, setLogs] = useState<{ timestamp: Date; level: "info" | "warn" | "error"; message: string }[]>([])
  const [showInvitePopup, setShowInvitePopup] = useState(false)

  const [showSidebar, setShowSidebar] = useState(false)

  // ... (previous useEffect and other functions)

  useEffect(() => {
    const unsubscribe = log.subscribe((logMessage) => {
      setLogs((prevLogs) => [...prevLogs, logMessage])
    })

    return () => unsubscribe()
  }, [])

  const joinChannel = async (ticket: string) => {
    try {
      const channel = await api.joinChannel(ticket, nickname)
      setChannels((prevChannels) => [...prevChannels, channel])
      setActiveChannel(channel.id)
      setCurrentView("chat")
      setIsConnected(true)
      const peers = await api.getPeers(channel.id)
      setNeighbors(peers.length)
    } catch (error) {
      console.error(`Failed to join channel: ${error}`)
    }
  }

  const createChannel = async () => {
    try {
      const channel = await api.createChannel(nickname)
      setChannels((prevChannels) => [...prevChannels, channel])
      setActiveChannel(channel.id)
      setCurrentView("chat")
      setIsConnected(true)
      setNeighbors(0)
    } catch (error) {
      console.error(`Failed to create channel: ${error}`)
    }
  }

  const closeChannel = async (channelId: string) => {
    try {
      await api.closeChannel(channelId)
      setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== channelId))
      if (activeChannel === channelId) {
        setActiveChannel(channels.length > 1 ? channels[0].id : null)
        if (channels.length === 1) {
          setCurrentView("home")
          setIsConnected(false)
        }
      }
    } catch (error) {
      console.error(`Failed to close channel: ${error}`)
    }
  }

  const handleNewChannel = () => {
    setCurrentView("home")
    setShowSidebar(true)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen">
        {(currentView === "chat" || showSidebar) && (
          <Sidebar
            channels={channels}
            activeChannel={activeChannel}
            onChannelSelect={(channelId) => {
              setActiveChannel(channelId)
              setCurrentView("chat")
            }}
            onNewChannel={handleNewChannel}
          />
        )}
        <div className="flex flex-col flex-grow">
          <Header
            isConnected={isConnected}
            neighbors={neighbors}
            onMenuClick={() => setShowLogView(!showLogView)}
            themeToggle={<ThemeToggle />}
            channel={activeChannel ? channels.find((c) => c.id === activeChannel)?.name || null : null}
            onInviteClick={() => setShowInvitePopup(true)}
          />
          {currentView === "home" && (
            <HomeScreen
              name={nickname}
              onSetName={setNickname}
              onJoin={(ticket) => {
                joinChannel(ticket)
                setShowSidebar(false)
              }}
              onCreate={() => {
                createChannel()
                setShowSidebar(false)
              }}
            />
          )}
          {currentView === "chat" && activeChannel && (
            <ChatView channel={activeChannel} onClose={() => closeChannel(activeChannel)} />
          )}
          {showLogView && <LogView logs={logs} onClose={() => setShowLogView(false)} />}
          {showInvitePopup && activeChannel && (
            <InvitePopup
              onClose={() => setShowInvitePopup(false)}
              channel={channels.find((c) => c.id === activeChannel)?.name || ""}
              getTicket={(opts) => api.getTicket(activeChannel!, opts)}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

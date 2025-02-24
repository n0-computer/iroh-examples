"use client"

import { useState, useEffect } from "react"
import HomeScreen from "./components/homescreen"
import ChatView from "./components/chatview"
import Header from "./components/header"
import LogView from "./components/logview"
import Sidebar from "./components/sidebar"
import { ThemeProvider } from "next-themes"
import { InvitePopup } from "./components/invitepopup"
import { API, initApi, type ChannelInfo } from "./lib/api"
import { generate as generateName } from 'yet-another-name-generator'
import { log } from "./lib/log"

export default function AppWrapper() {
  const [api, setApi] = useState<API | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    initApi()
      .then(setApi)
      .catch(err => setError(err.toString()))
  }, [])
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen">
        {!api && (
          <SplashScreen>
            {!error && <div className="text-center">Spawning Iroh…<br /><Spinner /></div>}
            {error && <div>{error}</div>}
          </SplashScreen>
        )}
        {api && <App api={api} />}
      </div>
    </ThemeProvider>
  )
}

function Spinner() {
  return (
    <svg className="inline-block h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

function SplashScreen({ children }: React.PropsWithChildren) {
  const [showLogView, setShowLogView] = useState(false)
  return (
    <div className="flex flex-col flex-grow">
      <Header
        onLogsClick={() => setShowLogView(!showLogView)}
      />
      {showLogView && <LogView onClose={() => setShowLogView(false)} />}
      <div className="flex items-center justify-center">
        {children}
      </div>
    </div>
  )

}

interface AppProps {
  api: API
}

function App({ api }: AppProps) {
  const [currentView, setCurrentView] = useState<"home" | "chat">("home")
  const [channels, setChannels] = useState<ChannelInfo[]>([])
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [showLogView, setShowLogView] = useState(false)
  const [nickname, setNickname] = useState(generateName())
  const [showInvitePopup, setShowInvitePopup] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const joinChannel = async (ticket: string) => {
    try {
      const channel = await api.joinChannel(ticket, nickname)
      setChannels((prevChannels) => [...prevChannels, channel])
      setActiveChannel(channel.id)
      setCurrentView("chat")
    } catch (error) {
      log.error("Failed to join channel", error)
    }
  }

  const createChannel = async () => {
    try {
      const channel = await api.createChannel(nickname)
      setChannels((prevChannels) => [...prevChannels, channel])
      setActiveChannel(channel.id)
      setCurrentView("chat")
    } catch (error) {
      log.error("Failed to create channel", error)
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
        }
      }
    } catch (error) {
      log.error("Failed to close channel", error)
    }
  }

  const handleNewChannel = () => {
    setCurrentView("home")
    setShowSidebar(true)
  }

  let title
  if (activeChannel) {
    title = '#' + channels.find((c) => c.id === activeChannel)?.name
  }

  return (
    <>
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
          onLogsClick={() => setShowLogView(!showLogView)}
          title={title}
          onInviteClick={activeChannel ? (() => setShowInvitePopup(true)) : undefined}
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
          <ChatView api={api} channel={activeChannel} onClose={() => closeChannel(activeChannel)} />
        )}
        {showLogView && <LogView onClose={() => setShowLogView(false)} />}
        {showInvitePopup && activeChannel && (
          <InvitePopup
            onClose={() => setShowInvitePopup(false)}
            channel={channels.find((c) => c.id === activeChannel)?.name || ""}
            getTicket={(opts) => api.getTicket(activeChannel!, opts)}
          />
        )}
      </div>
    </>
  )
}

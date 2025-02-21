"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Hash, ChevronLeft, ChevronRight } from "lucide-react"
import type { ChannelInfo } from "../lib/api"

interface SidebarProps {
  channels: ChannelInfo[]
  activeChannel: string | null
  onChannelSelect: (channelId: string) => void
  onNewChannel: () => void
}

export default function Sidebar({ channels, activeChannel, onChannelSelect, onNewChannel }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`bg-secondary h-full flex flex-col transition-all duration-300 ${isCollapsed ? "w-12" : "w-64"}`}>
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && <h2 className="text-lg font-semibold">Channels</h2>}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        {channels.map((channel) => (
          <Button
            key={channel.id}
            variant={channel.id === activeChannel ? "secondary" : "ghost"}
            className={`w-full justify-start px-4 py-2 ${isCollapsed ? "px-2" : "px-4"}`}
            onClick={() => onChannelSelect(channel.id)}
          >
            <Hash className="h-4 w-4 mr-2" />
            {!isCollapsed && channel.name}
          </Button>
        ))}
      </ScrollArea>
      <Button variant="ghost" size="icon" onClick={onNewChannel} className="m-4">
        <PlusCircle className="h-5 w-5" />
      </Button>
    </div>
  )
}

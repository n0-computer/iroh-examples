"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, FileText } from "lucide-react"

interface HeaderProps {
  isConnected: boolean
  neighbors: number
  onMenuClick: () => void
  onInviteClick: () => void
  themeToggle: React.ReactNode
  channel: string | null
}

export default function Header({
  onMenuClick,
  onInviteClick,
  themeToggle,
  channel,
  // isConnected,
  // neighbors,
}: HeaderProps) {
  return (
    <header className="bg-background text-foreground p-4 flex justify-between items-center">
      <div className="flex items-center">{channel && <h1 className="text-xl font-bold mr-4">#{channel}</h1>}</div>
      <div className="flex items-center space-x-2">
        {themeToggle}
        {channel && (
          <Button onClick={onInviteClick} variant="default">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite
          </Button>
        )}
        <Button onClick={onMenuClick} variant="secondary">
          <FileText className="w-4 h-4 mr-2" />
          Logs
        </Button>
      </div>
    </header>
  )
}

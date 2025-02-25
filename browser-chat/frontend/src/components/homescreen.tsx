"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HomeScreenProps {
  name: string
  onSetName: (name: string) => void
  onJoin: (ticket: string) => void
  onCreate: () => void
}

export default function HomeScreen({ onJoin, onCreate, name, onSetName }: HomeScreenProps) {
  const [ticket, setTicket] = useState(() => {
    const url = new URL(document.location.toString())
    const ticket = url.searchParams.get("ticket")
    if (ticket?.startsWith("chat")) return ticket
    return ""
  })
  // const [channelName, setChannelName] = useState("")

  const handleJoin = (e: FormEvent) => {
    e.preventDefault()
    if (ticket.trim()) {
      onJoin(ticket.trim())
    }
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    onCreate()
    // if (channelName.trim()) {
    //   onCreate(channelName.trim())
    // }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4">
      <div className="w-full max-w-md space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Your name</h2>
          <div className="flex space-x-2">
            <Input value={name} onChange={(e) => onSetName(e.target.value)} placeholder="Enter your name" />
          </div>
        </div>
        {name.length && (
          <>
            <form onSubmit={handleJoin}>
              <h2 className="text-lg font-semibold mb-2">Join Channel</h2>
              <div className="flex space-x-2">
                <Input value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="Enter ticket" />
                <Button type="submit">Join</Button>
              </div>
            </form>
            <form onSubmit={handleCreate}>
              <h2 className="text-lg font-semibold mb-2">Create Channel</h2>
              <div className="flex space-x-2">
                {/* <Input
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Enter channel name"
                /> */}
                <Button type="submit">Create</Button>
              </div>
            </form>

          </>
        )}
      </div>
    </div>
  )
}

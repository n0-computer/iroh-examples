"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { generate as generateName } from 'yet-another-name-generator'

interface HomeScreenProps {
  onJoin: (ticket: string, nickname: string) => void
  onCreate: (nickname: string) => void
}

export default function HomeScreen({ onJoin, onCreate }: HomeScreenProps) {
  const [ticket, setTicket] = useState(() => {
    const url = new URL(document.location.toString())
    const ticket = url.searchParams.get("ticket")
    if (ticket?.startsWith("chat")) return ticket
    return ""
  })

  const [nickname, setNickname] = useState(generateName())

  const handleJoin = (e: FormEvent) => {
    e.preventDefault()
    if (ticket.trim()) {
      onJoin(ticket.trim(), nickname)
    }
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    onCreate(nickname)
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4">
      <div className="w-full max-w-md space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Your name</h2>
          <div className="flex space-x-2">
            <Input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Enter your name" />
          </div>
        </div>
        <form onSubmit={handleJoin}>
          <h2 className="text-lg font-semibold mb-2">Join Channel</h2>
          <div className="flex space-x-2">
            <Input value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="Enter ticket" />
            <Button type="submit" disabled={!nickname.length || !ticket.length}>Join</Button>
          </div>
        </form>
        <form onSubmit={handleCreate}>
          <h2 className="text-lg font-semibold mb-2">Create Channel</h2>
          <div className="flex space-x-2">
            <Button type="submit" disabled={!nickname.length}>Create</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

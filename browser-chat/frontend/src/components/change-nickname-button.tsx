
import { FormEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { API } from "@/lib/api"

interface ChangeNicknameProps {
  api: API
  channel: string
}

export function ChangeNicknameButton({ api, channel }: ChangeNicknameProps) {
  const [myself, setMyself] = useState(api.getMyself(channel))
  const [name, setName] = useState(myself.name)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    return api.subscribeToPeers(channel, () => {
      setMyself(api.getMyself(channel))
    })
  }, [api, channel])
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      api.setNickname(channel, name)
      setOpen(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">Change nickname</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change nickname</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your nickname" />
          <Button size="sm" type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


import { FormEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
  AdaptiveDialogTrigger,
} from "@/components/ui/adaptive-dialog"
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
    <AdaptiveDialog open={open} onOpenChange={setOpen}>
      <AdaptiveDialogTrigger>
        <Button variant="secondary" size="sm">Change nickname</Button>
      </AdaptiveDialogTrigger>
      <AdaptiveDialogContent className="sm:max-w-[425px]">
        <AdaptiveDialogHeader>
          <AdaptiveDialogTitle>Change nickname</AdaptiveDialogTitle>
        </AdaptiveDialogHeader>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your nickname" />
          <Button size="sm" type="submit">Save</Button>
        </form>
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  )
}

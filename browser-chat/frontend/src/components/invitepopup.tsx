"use client"

import { useState, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Copy } from "lucide-react"
import { TicketOpts } from "@/lib/api"

function ticketUrl(ticket: string) {
  const baseUrl = new URL(document.location.toString())
  baseUrl.searchParams.set("ticket", ticket)
  return baseUrl.toString()
}

interface InvitePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  channel: string
  getTicket: (options: {
    includeMyself: boolean
    includeBootstrap: boolean
    includeNeighbors: boolean
  }) => string
}

export function InvitePopup({ open, onOpenChange, channel, getTicket }: InvitePopupProps) {
  const [ticketOptions, setTicketOptions] = useState<TicketOpts>({
    includeMyself: true,
    includeBootstrap: true,
    includeNeighbors: false,
  })
  const ticket = useMemo(() => getTicket(ticketOptions), [ticketOptions, channel])
  const cliCommandRef = useRef<HTMLInputElement>(null)


  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
  }

  const cliCommand = `cargo run -- join ${ticket}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle>Invite to channel</DialogTitle>
      <DialogContent>
        <div className="mb-4">
          <p className="font-semibold mb-2">Ticket</p>
          <div className="flex items-center">
            <span className="mr-2 font-mono">{ticket.substring(0, 16)}...</span>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(ticket)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-2">Join link</p>
          <a href={ticketUrl(ticket)} className="text-blue-500 hover:underline" target="_blank">
            {ticketUrl(ticket.substring(0, 16))}...
          </a>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-2">Join from the command line</p>
          <Input
            ref={cliCommandRef}
            value={cliCommand}
            readOnly
            className="mb-2"
            onClick={() => cliCommandRef.current?.select()}
          />
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(cliCommand)}>
            <Copy className="w-4 h-4 mr-2" />
            Copy to Clipboard
          </Button>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Configure ticket</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="include-myself"
                checked={ticketOptions.includeMyself}
                onCheckedChange={(checked) => setTicketOptions({ ...ticketOptions, includeMyself: !!checked })}
              />
              <label htmlFor="include-myself" className="ml-2">
                Include myself
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="include-bootstrap"
                checked={ticketOptions.includeBootstrap}
                onCheckedChange={(checked) => setTicketOptions({ ...ticketOptions, includeBootstrap: !!checked })}
              />
              <label htmlFor="include-bootstrap" className="ml-2">
                Include my bootstrap
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="include-neighbors"
                checked={ticketOptions.includeNeighbors}
                onCheckedChange={(checked) => setTicketOptions({ ...ticketOptions, includeNeighbors: !!checked })}
              />
              <label htmlFor="include-neighbors" className="ml-2">
                Include my current neighbors
              </label>
            </div>
          </div>
        </div>
        {/* <Button onClick={generateTicket}>Generate Ticket</Button> */}
        <div className="flex justify-end">
          <Button onClick={(_) => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

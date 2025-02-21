"use client"

import { useState, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Copy } from "lucide-react"
import { TicketOpts } from "@/lib/api"

function ticketUrl(ticket: string) {
  const baseUrl = new URL(document.location.toString())
  baseUrl.searchParams.set("ticket", ticket)
  return baseUrl.toString()
}

interface InvitePopupProps {
  onClose: () => void
  channel: string
  getTicket: (options: {
    includeMyself: boolean
    includeBootstrap: boolean
    includeNeighbors: boolean
  }) => string
}

export function InvitePopup({ onClose, channel, getTicket }: InvitePopupProps) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background text-foreground p-6 rounded-lg w-full max-w-md shadow-lg border-2 border-primary/10">
        <h2 className="text-xl font-semibold mb-4">Invite to Channel</h2>
        <div className="mb-4">
          <p className="font-semibold mb-2">Ticket:</p>
          <div className="flex items-center">
            <span className="mr-2">{ticket.substring(0, 8)}...</span>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(ticket)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-2">Join Link:</p>
          <a href={ticketUrl(ticket)} className="text-blue-500 hover:underline" target="_blank">
            {ticketUrl(ticket.substring(0, 8))}...
          </a>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-2">Join from CLI:</p>
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
          <h3 className="font-semibold mb-2">Configure Ticket:</h3>
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
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

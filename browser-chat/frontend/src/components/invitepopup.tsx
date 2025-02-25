"use client"

import { useState, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
  AdaptiveDialogTrigger,
} from "@/components/ui/adaptive-dialog"
import { Copy, Share2 } from "lucide-react"
import { TicketOpts } from "@/lib/api"
import { useIsDesktop } from "@/hooks/use-media-query"
import clsx from "clsx"

function ticketUrl(ticket: string) {
  const baseUrl = new URL(document.location.toString())
  baseUrl.searchParams.set("ticket", ticket)
  return baseUrl.toString()
}

interface InvitePopupProps {
  channel: string
  getTicket: (options: {
    includeMyself: boolean
    includeBootstrap: boolean
    includeNeighbors: boolean
  }) => string
}
export function InviteButton({ channel, getTicket }: InvitePopupProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const cls = clsx(
    isDesktop ? 'w-2xl max-w-3xl' : 'max-w-[100vw]',
    "max-h-[80vh]"
  )
  return (
    <AdaptiveDialog open={open} onOpenChange={setOpen}>
      <AdaptiveDialogTrigger>
        <Button variant="default">
          <Share2 />
          Invite peers
        </Button>
      </AdaptiveDialogTrigger>
      <AdaptiveDialogContent className={cls}>
        <div className="">
          <AdaptiveDialogHeader>
            <AdaptiveDialogTitle>Invite peers</AdaptiveDialogTitle>
          </AdaptiveDialogHeader>
          <div className="grow-0 mt-2 max-h-[60vh] max-w-2xl overflow-auto">
            <InvitePopupContent channel={channel} getTicket={getTicket} />
          </div>
        </div>
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  )
}


export function InvitePopupContent({ channel, getTicket }: InvitePopupProps) {
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

  const ticketUrlFull = ticketUrl(ticket)
  const ticketUrlShort = ticketUrl(ticket.substring(0, 16))

  return (
    <>
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
        <div className="flex items-center space-x-2">
          <a href={ticketUrlFull} className="text-blue-500 hover:underline" target="_blank">
            {ticketUrlShort}…
          </a>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(ticketUrlFull)}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
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
      </div >
    </>
  )
}

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  AdaptiveDialog,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
  AdaptiveDialogTrigger,
} from "@/components/ui/adaptive-dialog"
import { useEffect, useState } from "react";
import { log, LogMessage } from "@/lib/log";
import { FileText } from "lucide-react";
import { useIsDesktop } from "@/hooks/use-media-query";
import clsx from "clsx";

export function LogViewButton() {
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const cls = clsx(
    isDesktop ? 'w-2xl max-w-3xl' : 'max-w-[100vw]',
    "max-h-[80vh]"
  )
  return (
    <AdaptiveDialog open={open} onOpenChange={setOpen}>
      <AdaptiveDialogTrigger>
        <Button variant="secondary">
          <FileText className="w-4 h-4 mr-2" />
          Logs
        </Button>
      </AdaptiveDialogTrigger>
      <AdaptiveDialogContent className={cls}>
        <div className="">
          <AdaptiveDialogHeader>
            <AdaptiveDialogTitle>Logs</AdaptiveDialogTitle>
          </AdaptiveDialogHeader>
          <div className="grow-0 mt-2 max-h-[60vh] max-w-2xl overflow-auto">
            <LogView />
          </div>
        </div>
      </AdaptiveDialogContent>
    </AdaptiveDialog>
  )
}

export function LogView() {
  const logs = useLogs();

  const formatTimestamp = (date: Date) => {
    return date.toTimeString().split(" ")[0] + "." + date.getMilliseconds().toString().padStart(3, "0").slice(0, 2)
  }

  const getLogColor = (level: "info" | "warn" | "error") => {
    switch (level) {
      case "error":
        return "text-red-500"
      case "warn":
        return "text-yellow-500"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="max-w-3xl overflow-hidden flex flex-col relative">
      <ScrollArea className="flex-grow mb-4 font-mono overflow-auto">
        <div className="space-y-1">
          {logs.map((log, index) => (
            <div key={index} className={`${getLogColor(log.level)}`}>
              <span className="text-muted-foreground">{formatTimestamp(log.timestamp)}</span> {log.message}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}


function useLogs() {
  const [logs, setLogs] = useState<LogMessage[]>([...log.get()])
  useEffect(() => {
    const unsubscribe = log.subscribe((logMessage) => {
      setLogs((prevLogs) => [...prevLogs, logMessage])
    })
    return () => unsubscribe()
  }, [])
  return logs
}

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { log, LogMessage } from "@/lib/log";

interface LogViewProps {
  onClose: () => void
}

export default function LogView({ onClose }: LogViewProps) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background text-foreground p-4 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Log View</h2>
        <ScrollArea className="flex-grow mb-4 font-mono">
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div key={index} className={`${getLogColor(log.level)}`}>
                <span className="text-muted-foreground">{formatTimestamp(log.timestamp)}</span> {log.message}
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button onClick={onClose}>Close</Button>
      </div>
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

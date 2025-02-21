
// Log system
export type LogLevel = "info" | "warn" | "error"

export type LogMessage = {
  timestamp: Date
  level: LogLevel
  message: string
}

class LogSystem {
  private logs: LogMessage[] = []
  private subscribers: Set<(log: LogMessage) => void> = new Set()

  error(message: any) {
    console.error(message)
    this.info(String(message), "error")
  }

  info(message: string, level: LogLevel = "info") {
    const logMessage: LogMessage = {
      timestamp: new Date(),
      level,
      message,
    }
    this.logs.push(logMessage)
    this.notifySubscribers(logMessage)
  }

  getLogs(): LogMessage[] {
    return this.logs
  }

  subscribe(callback: (log: LogMessage) => void): () => void {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  private notifySubscribers(log: LogMessage) {
    this.subscribers.forEach((callback) => callback(log))
  }
}

export const log = new LogSystem()

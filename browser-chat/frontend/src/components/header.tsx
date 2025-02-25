"use client"

import { Button } from "@/components/ui/button"
import { UserPlus, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { LogViewButton } from "./logview"

interface HeaderProps {
  onInviteClick?: () => void
  title?: string | null
}

export default function Header({
  onInviteClick,
  title,
}: HeaderProps) {
  return (
    <header className="bg-background text-foreground p-4 flex justify-between items-center">
      <div className="flex items-center">
        {title && <h1 className="text-xl font-bold mr-4">{title}</h1>}
      </div>
      <div className="flex items-center space-x-2">
        {onInviteClick && (
          <Button onClick={onInviteClick} variant="default">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite
          </Button>
        )}
        <LogViewButton />
        {/* <Button onClick={onLogsClick} variant="secondary">
          <FileText className="w-4 h-4 mr-2" />
          Logs
        </Button> */}
        <ThemeToggle />
      </div>
    </header>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}


"use client"

import * as React from "react"
import { useIsDesktop } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const AdaptiveDialogContext = React.createContext<{
  isDesktop: boolean
}>({ isDesktop: true })

export function AdaptiveDialog({ children, ...props }: React.ComponentProps<typeof Dialog>) {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <AdaptiveDialogContext.Provider value={{ isDesktop }}>
        <Dialog modal={true} {...props}>{children}</Dialog>
      </AdaptiveDialogContext.Provider>
    )
  }

  return (
    <AdaptiveDialogContext.Provider value={{ isDesktop }}>
      <Drawer {...props}>{children}</Drawer>
    </AdaptiveDialogContext.Provider>
  )
}

export function AdaptiveDialogTrigger({ children }: { children: React.ReactNode }) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext)

  if (isDesktop) {
    return <DialogTrigger asChild>{children}</DialogTrigger>
  }

  return <DrawerTrigger asChild>{children}</DrawerTrigger>
}

export function AdaptiveDialogContent({ children, ...props }: React.ComponentProps<typeof DialogContent>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext)

  if (isDesktop) {
    return <DialogContent {...props}>{children}</DialogContent>
  }

  return (
    <DrawerContent {...props}>
      {children}
      <DrawerFooter className="pt-2">
        <DrawerClose asChild>
          <button className="btn btn-outline">Cancel</button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  )
}

export function AdaptiveDialogHeader({ children, ...props }: React.ComponentProps<typeof DialogHeader>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext)

  if (isDesktop) {
    return <DialogHeader {...props}>{children}</DialogHeader>
  }

  return <DrawerHeader {...props}>{children}</DrawerHeader>
}

export function AdaptiveDialogTitle({ children, ...props }: React.ComponentProps<typeof DialogTitle>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext)

  if (isDesktop) {
    return <DialogTitle {...props}>{children}</DialogTitle>
  }

  return <DrawerTitle {...props}>{children}</DrawerTitle>
}

export function AdaptiveDialogDescription({ children, ...props }: React.ComponentProps<typeof DialogDescription>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext)

  if (isDesktop) {
    return <DialogDescription {...props}>{children}</DialogDescription>
  }

  return <DrawerDescription {...props}>{children}</DrawerDescription>
}

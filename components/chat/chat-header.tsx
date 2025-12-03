"use client"

import Image from "next/image"
import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export function ChatHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-primary">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-primary-foreground hover:bg-primary-foreground/10"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Image
          src="/halter-logo-white.svg"
          alt="Halter"
          width={120}
          height={32}
          className="h-7 w-auto"
          priority
        />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}

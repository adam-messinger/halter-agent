"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { useSidebar } from "@/components/ui/sidebar"

interface KeyboardShortcutsOptions {
  onNewChat?: () => void
}

export function useKeyboardShortcuts(options: KeyboardShortcutsOptions = {}) {
  const { setTheme, theme } = useTheme()
  const sidebar = useSidebar()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey

      // Cmd/Ctrl + K: New chat
      if (isMod && e.key === "k") {
        e.preventDefault()
        options.onNewChat?.()
      }

      // Cmd/Ctrl + /: Toggle sidebar
      if (isMod && e.key === "/") {
        e.preventDefault()
        sidebar.toggleSidebar()
      }

      // Cmd/Ctrl + D: Toggle dark mode
      if (isMod && e.key === "d") {
        e.preventDefault()
        setTheme(theme === "dark" ? "light" : "dark")
      }

      // Escape: Close sidebar (on mobile)
      if (e.key === "Escape") {
        if (sidebar.openMobile) {
          sidebar.setOpenMobile(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [options, setTheme, theme, sidebar])
}

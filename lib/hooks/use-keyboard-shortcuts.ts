"use client"

import { useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { useSidebar } from "@/components/ui/sidebar"

export function useKeyboardShortcuts(onNewChat?: () => void) {
  const { setTheme, resolvedTheme } = useTheme()
  const { toggleSidebar, openMobile, setOpenMobile } = useSidebar()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMod = e.metaKey || e.ctrlKey

    // Cmd/Ctrl + K: New chat
    if (isMod && e.key === "k") {
      e.preventDefault()
      onNewChat?.()
    }

    // Cmd/Ctrl + /: Toggle sidebar
    if (isMod && e.key === "/") {
      e.preventDefault()
      toggleSidebar()
    }

    // Cmd/Ctrl + D: Toggle dark mode
    if (isMod && e.key === "d") {
      e.preventDefault()
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    // Escape: Close sidebar (on mobile)
    if (e.key === "Escape" && openMobile) {
      setOpenMobile(false)
    }
  }, [onNewChat, toggleSidebar, setTheme, resolvedTheme, openMobile, setOpenMobile])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}

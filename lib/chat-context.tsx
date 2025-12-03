"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface ChatContextValue {
  onNewChat: () => void
  setOnNewChat: (fn: () => void) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [newChatFn, setNewChatFn] = useState<() => void>(() => () => {})

  const setOnNewChat = useCallback((fn: () => void) => {
    setNewChatFn(() => fn)
  }, [])

  return (
    <ChatContext.Provider value={{ onNewChat: newChatFn, setOnNewChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatActions() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChatActions must be used within ChatProvider")
  }
  return context
}

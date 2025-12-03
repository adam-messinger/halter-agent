"use client"

import { useCallback, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts"
import { useChatActions } from "@/lib/chat-context"

// Stable transport instance - created once per module
const chatTransport = new DefaultChatTransport({ api: "/api/chat" })

export function ChatContainer() {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: chatTransport,
  })
  const { setOnNewChat } = useChatActions()

  const handleSend = useCallback((text: string) => {
    sendMessage({ text })
  }, [sendMessage])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    sendMessage({ text: suggestion })
  }, [sendMessage])

  const handleNewChat = useCallback(() => {
    setMessages([])
  }, [setMessages])

  // Register the new chat handler with context so sidebar can use it
  useEffect(() => {
    setOnNewChat(handleNewChat)
  }, [setOnNewChat, handleNewChat])

  // Keyboard shortcuts
  useKeyboardShortcuts(handleNewChat)

  // Show thinking state for both "submitted" (waiting) and "streaming" states
  const isThinking = status === "submitted" || status === "streaming"

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />
      <ChatMessages
        messages={messages}
        isThinking={isThinking}
        onSuggestionClick={handleSuggestionClick}
      />
      <ChatInput
        onSend={handleSend}
        disabled={status !== "ready"}
      />
    </div>
  )
}

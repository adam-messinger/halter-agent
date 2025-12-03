"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatHeader } from "./chat-header"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts"

export function ChatContainer() {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  })

  const handleSend = (text: string) => {
    sendMessage({ text })
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion })
  }

  const handleNewChat = () => {
    setMessages([])
  }

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNewChat: handleNewChat,
  })

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader />
      <ChatMessages
        messages={messages}
        isStreaming={status === "streaming"}
        onSuggestionClick={handleSuggestionClick}
      />
      <ChatInput
        onSend={handleSend}
        disabled={status !== "ready"}
      />
    </div>
  )
}

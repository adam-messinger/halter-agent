"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"
import { ChatEmptyState } from "./chat-empty-state"
import { ChatThinking } from "./chat-thinking"
import type { UIMessage } from "ai"

interface ChatMessagesProps {
  messages: UIMessage[]
  isStreaming: boolean
  onSuggestionClick?: (suggestion: string) => void
}

export function ChatMessages({ messages, isStreaming, onSuggestionClick }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isStreaming])

  if (messages.length === 0) {
    return <ChatEmptyState onSuggestionClick={onSuggestionClick} />
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 md:p-6 flex flex-col gap-4">
        {messages.map((message) => {
          // Extract text content from message parts
          const textContent = message.parts
            .filter((part): part is { type: "text"; text: string } => part.type === "text")
            .map((part) => part.text)
            .join("")

          return (
            <ChatMessage
              key={message.id}
              role={message.role as "user" | "assistant"}
              content={textContent}
            />
          )
        })}

        {isStreaming && <ChatThinking />}

        {/* Scroll anchor */}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  )
}

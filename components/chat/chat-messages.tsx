"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"
import { ChatEmptyState } from "./chat-empty-state"
import { ChatThinking } from "./chat-thinking"
import type { UIMessage } from "ai"

interface ChatMessagesProps {
  messages: UIMessage[]
  isThinking: boolean
  onSuggestionClick?: (suggestion: string) => void
}

export function ChatMessages({ messages, isThinking, onSuggestionClick }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isThinking])

  if (messages.length === 0) {
    return <ChatEmptyState onSuggestionClick={onSuggestionClick} />
  }

  // Check if the last message is an empty assistant message (thinking state)
  const lastMessage = messages[messages.length - 1]
  const lastMessageContent = lastMessage?.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("")
  const isLastMessageEmptyAssistant =
    lastMessage?.role === "assistant" && !lastMessageContent.trim() && isThinking

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 md:p-6 flex flex-col gap-4">
        {messages.map((message, index) => {
          // Extract text content from message parts
          const textContent = message.parts
            .filter((part): part is { type: "text"; text: string } => part.type === "text")
            .map((part) => part.text)
            .join("")

          // If this is the last message and it's an empty assistant message while thinking,
          // show the thinking indicator instead of an empty bubble
          const isThisEmptyAssistant =
            index === messages.length - 1 &&
            message.role === "assistant" &&
            !textContent.trim() &&
            isThinking

          if (isThisEmptyAssistant) {
            return <ChatThinking key={message.id} />
          }

          return (
            <ChatMessage
              key={message.id}
              role={message.role as "user" | "assistant"}
              content={textContent}
            />
          )
        })}

        {/* Show thinking indicator if we're thinking but don't have an empty assistant message yet */}
        {isThinking && !isLastMessageEmptyAssistant && <ChatThinking />}

        {/* Scroll anchor */}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  )
}

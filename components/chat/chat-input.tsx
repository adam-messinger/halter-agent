"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder = "Ask about your herd..." }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput("")
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-border bg-background p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex gap-3 max-w-4xl mx-auto items-end"
      >
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className={cn(
              "w-full resize-none px-4 py-3 rounded-2xl border-2 border-input bg-background text-foreground text-sm",
              "outline-none focus:border-ring focus:ring-1 focus:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors placeholder:text-muted-foreground",
              "min-h-[48px] max-h-[200px]"
            )}
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !input.trim()}
          className="h-12 w-12 rounded-full shrink-0"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
}

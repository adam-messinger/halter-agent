"use client"

import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer"
import { cn, parseSuggestions } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  onSuggestionClick?: (suggestion: string) => void
  showSuggestions?: boolean
}

export function ChatMessage({ role, content, onSuggestionClick, showSuggestions }: ChatMessageProps) {
  const { copied, copy } = useCopyToClipboard()
  const isUser = role === "user"

  // Parse suggestions from assistant messages
  const { text, suggestions } = isUser ? { text: content, suggestions: [] } : parseSuggestions(content)

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex group animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "relative max-w-[85%] md:max-w-[75%] p-4 rounded-2xl",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-card text-card-foreground shadow-sm border border-border rounded-bl-md"
          )}
        >
          {/* Copy button - appears on hover */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute -top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity",
                  isUser
                    ? "hover:bg-primary-foreground/10 text-primary-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => copy(text)}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="sr-only">Copy message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {copied ? "Copied!" : "Copy message"}
            </TooltipContent>
          </Tooltip>

          <div className={cn("prose prose-sm max-w-none", isUser && "prose-invert")}>
            <MarkdownRenderer content={text} isUserMessage={isUser} />
          </div>
        </div>
      </div>

      {/* Follow-up suggestions */}
      {showSuggestions && suggestions.length > 0 && onSuggestionClick && (
        <div className="flex flex-wrap gap-2 pl-1 animate-in fade-in-0 slide-in-from-bottom-1 duration-300 delay-150">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-3 py-1.5 text-sm rounded-full border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const { copied, copy } = useCopyToClipboard()
  const isUser = role === "user"

  return (
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
        <TooltipProvider>
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
                onClick={() => copy(content)}
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
        </TooltipProvider>

        <div className={cn("prose prose-sm max-w-none", isUser && "prose-invert")}>
          <MarkdownRenderer content={content} isUserMessage={isUser} />
        </div>
      </div>
    </div>
  )
}

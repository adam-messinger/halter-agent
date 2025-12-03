"use client"

import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-border bg-muted">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => copy(code)}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  )
}

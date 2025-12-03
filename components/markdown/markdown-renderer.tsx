"use client"

import ReactMarkdown from "react-markdown"
import { CodeBlock } from "./code-block"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  isUserMessage?: boolean
}

export function MarkdownRenderer({ content, isUserMessage = false }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-2 pl-5 list-disc space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 pl-5 list-decimal space-y-1">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          const isInline = !match && !className

          if (isInline) {
            return (
              <code
                className={cn(
                  "px-1.5 py-0.5 rounded text-sm font-mono",
                  isUserMessage
                    ? "bg-primary-foreground/20"
                    : "bg-accent text-accent-foreground"
                )}
                {...props}
              >
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              language={match?.[1] || "text"}
              code={String(children).replace(/\n$/, "")}
            />
          )
        },
        pre: ({ children }) => <>{children}</>,
        h1: ({ children }) => (
          <h1 className="text-lg font-bold mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base font-bold mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-bold mb-1">{children}</h3>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

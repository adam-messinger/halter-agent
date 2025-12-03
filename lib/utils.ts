import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UIMessage } from "ai"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extract text content from a UIMessage's parts
 */
export function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("")
}

/**
 * Parse suggestions from message content
 * Format: :::suggestions\nSuggestion 1\nSuggestion 2\n:::
 */
export function parseSuggestions(content: string): { text: string; suggestions: string[] } {
  const match = content.match(/:::suggestions\n([\s\S]*?):::/);
  if (!match) {
    return { text: content, suggestions: [] }
  }

  const suggestions = match[1]
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  const text = content.replace(/:::suggestions\n[\s\S]*?:::/, "").trim()

  return { text, suggestions }
}

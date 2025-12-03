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

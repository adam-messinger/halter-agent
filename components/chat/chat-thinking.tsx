import { HalterIcon } from "@/components/icons/halter-icon"

export function ChatThinking() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3 p-4 rounded-2xl rounded-bl-md bg-card shadow-sm border border-border">
        <div className="animate-spin-slow">
          <HalterIcon className="w-6 h-6" />
        </div>
        <span className="text-muted-foreground text-sm animate-pulse-green">
          Thinking...
        </span>
      </div>
    </div>
  )
}

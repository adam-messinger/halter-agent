import { HalterLoadingIcon } from "@/components/icons/halter-loading-icon"

export function ChatThinking() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3 p-4 rounded-2xl rounded-bl-md bg-card shadow-sm border border-border">
        <HalterLoadingIcon className="w-7 h-7" />
        <span className="text-muted-foreground text-sm">
          Thinking...
        </span>
      </div>
    </div>
  )
}

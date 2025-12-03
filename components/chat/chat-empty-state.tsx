import { HalterCowIcon } from "@/components/icons/halter-cow-icon"

interface ChatEmptyStateProps {
  onSuggestionClick?: (suggestion: string) => void
}

const suggestions = [
  "Show me today's farm summary",
  "Are there any health alerts I should know about?",
  "What's the grazing situation looking like?",
]

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8">
      <div className="mb-6">
        <HalterCowIcon className="w-20 h-20" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Welcome to Halter Farm Advisor
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Ask me about your herd, grazing conditions, health alerts, or any aspect of your farm operations.
      </p>

      {onSuggestionClick && (
        <div className="flex flex-wrap gap-2 justify-center max-w-lg">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 text-sm rounded-full border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

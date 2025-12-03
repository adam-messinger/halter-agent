interface SuggestionButtonProps {
  children: string
  onClick: () => void
}

export function SuggestionButton({ children, onClick }: SuggestionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-sm rounded-full border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {children}
    </button>
  )
}

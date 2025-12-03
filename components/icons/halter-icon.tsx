import { cn } from "@/lib/utils"

interface HalterIconProps {
  className?: string
}

export function HalterIcon({ className }: HalterIconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      {/* Outer collar ring */}
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      {/* Inner tech element */}
      <circle
        cx="20"
        cy="20"
        r="8"
        className="fill-accent"
      />
      {/* Center dot */}
      <circle
        cx="20"
        cy="20"
        r="3"
        fill="currentColor"
      />
      {/* Signal waves */}
      <path
        d="M28 12 C32 16, 32 24, 28 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 12 C8 16, 8 24, 12 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

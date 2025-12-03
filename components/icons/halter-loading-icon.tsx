"use client"

import { cn } from "@/lib/utils"

interface HalterLoadingIconProps {
  className?: string
}

export function HalterLoadingIcon({ className }: HalterLoadingIconProps) {
  // Single continuous path tracing the Halter "H" icon starting from upper left
  // Path length is approximately 900 units
  const pathLength = 900

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={cn("text-primary", className)}
    >
      <style>
        {`
          @keyframes trace {
            0% {
              stroke-dashoffset: ${pathLength};
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          .halter-trace {
            stroke-dasharray: ${pathLength};
            stroke-dashoffset: ${pathLength};
            animation: trace 2s ease-in-out infinite;
          }
        `}
      </style>
      {/* Background fill at low opacity */}
      <path
        fill="currentColor"
        opacity="0.1"
        d="M109.7,0h-28.6c-4.2,0-7.7,3.4-7.7,7.7v27.5c0,.8-.7,1.5-1.5,1.5h-28V7.7c0-4.2-3.4-7.7-7.7-7.7H7.7C3.5,0,0,3.4,0,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h29v29.5H7.7c-4.2,0-7.7,3.4-7.7,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7v-29h28c.8,0,1.5.7,1.5,1.5v27.5c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7V7.7c0-4.2-3.4-7.7-7.7-7.7M36.7,107.7c0,1.3-1.1,2.4-2.4,2.4H9.6c-1.3,0-2.4-1.1-2.4-2.4v-24.7c0-1.3,1.1-2.4,2.4-2.4h27.1v27.1h0ZM36.7,36.7H9.6c-1.3,0-2.4-1.1-2.4-2.4V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v27.1h0ZM110.1,107.7c0,1.3-1.1,2.4-2.4,2.4h-24.7c-1.3,0-2.4-1.1-2.4-2.4v-26.6c0-4.2-3.4-7.7-7.7-7.7h-29v-29.5h29c4.2,0,7.7-3.4,7.7-7.7V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v98.1h0Z"
      />
      {/* Single continuous stroke path starting from upper left */}
      <path
        className="halter-trace"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 7 7
           L 7 37
           L 37 37
           L 37 44
           L 7 44
           L 7 81
           L 7 110
           L 37 110
           L 37 81
           L 44 81
           L 44 110
           L 73 110
           L 73 81
           L 110 81
           L 110 7
           L 81 7
           L 81 37
           L 73 37
           L 73 7
           L 44 7
           L 44 37
           L 37 37
           L 37 7
           Z"
      />
    </svg>
  )
}

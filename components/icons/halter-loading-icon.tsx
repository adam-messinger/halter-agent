"use client"

import { cn } from "@/lib/utils"

interface HalterLoadingIconProps {
  className?: string
}

export function HalterLoadingIcon({ className }: HalterLoadingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117.6 117.6"
      className={cn("text-primary", className)}
    >
      <style>
        {`
          @keyframes trace {
            0% {
              stroke-dashoffset: 800;
            }
            50% {
              stroke-dashoffset: 0;
            }
            50.1% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -800;
            }
          }
          .halter-trace {
            stroke-dasharray: 800;
            stroke-dashoffset: 800;
            animation: trace 2.5s ease-in-out infinite;
          }
        `}
      </style>
      {/* Background fill at low opacity */}
      <path
        fill="currentColor"
        opacity="0.15"
        d="M109.7,0h-28.6c-4.2,0-7.7,3.4-7.7,7.7v27.5c0,.8-.7,1.5-1.5,1.5h-28V7.7c0-4.2-3.4-7.7-7.7-7.7H7.7C3.5,0,0,3.4,0,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h29v29.5H7.7c-4.2,0-7.7,3.4-7.7,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7v-29h28c.8,0,1.5.7,1.5,1.5v27.5c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7V7.7c0-4.2-3.4-7.7-7.7-7.7M36.7,107.7c0,1.3-1.1,2.4-2.4,2.4H9.6c-1.3,0-2.4-1.1-2.4-2.4v-24.7c0-1.3,1.1-2.4,2.4-2.4h27.1v27.1h0ZM36.7,36.7H9.6c-1.3,0-2.4-1.1-2.4-2.4V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v27.1h0ZM110.1,107.7c0,1.3-1.1,2.4-2.4,2.4h-24.7c-1.3,0-2.4-1.1-2.4-2.4v-26.6c0-4.2-3.4-7.7-7.7-7.7h-29v-29.5h29c4.2,0,7.7-3.4,7.7-7.7V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v98.1h0Z"
      />
      {/* Animated stroke trace */}
      <path
        className="halter-trace"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M109.7,0h-28.6c-4.2,0-7.7,3.4-7.7,7.7v27.5c0,.8-.7,1.5-1.5,1.5h-28V7.7c0-4.2-3.4-7.7-7.7-7.7H7.7C3.5,0,0,3.4,0,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h29v29.5H7.7c-4.2,0-7.7,3.4-7.7,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7v-29h28c.8,0,1.5.7,1.5,1.5v27.5c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7V7.7c0-4.2-3.4-7.7-7.7-7.7M36.7,107.7c0,1.3-1.1,2.4-2.4,2.4H9.6c-1.3,0-2.4-1.1-2.4-2.4v-24.7c0-1.3,1.1-2.4,2.4-2.4h27.1v27.1h0ZM36.7,36.7H9.6c-1.3,0-2.4-1.1-2.4-2.4V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v27.1h0ZM110.1,107.7c0,1.3-1.1,2.4-2.4,2.4h-24.7c-1.3,0-2.4-1.1-2.4-2.4v-26.6c0-4.2-3.4-7.7-7.7-7.7h-29v-29.5h29c4.2,0,7.7-3.4,7.7-7.7V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v98.1h0Z"
      />
    </svg>
  )
}

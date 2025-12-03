"use client"

import { cn } from "@/lib/utils"

interface HalterLoadingIconProps {
  className?: string
}

export function HalterLoadingIcon({ className }: HalterLoadingIconProps) {
  // The Halter logo has 3 separate pieces that form an "H":
  // 1. Upper-left square
  // 2. Lower-left square
  // 3. Right side tall shape (with notch)
  // We animate each piece sequentially

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={cn("text-primary", className)}
    >
      <style>
        {`
          @keyframes trace1 {
            0%, 100% { stroke-dashoffset: 120; }
            10%, 33% { stroke-dashoffset: 0; }
            43%, 100% { stroke-dashoffset: 0; }
          }
          @keyframes trace2 {
            0%, 33% { stroke-dashoffset: 120; }
            43%, 66% { stroke-dashoffset: 0; }
            76%, 100% { stroke-dashoffset: 0; }
          }
          @keyframes trace3 {
            0%, 66% { stroke-dashoffset: 400; }
            100% { stroke-dashoffset: 0; }
          }
          .trace-1 {
            stroke-dasharray: 120;
            stroke-dashoffset: 120;
            animation: trace1 2.5s ease-in-out infinite;
          }
          .trace-2 {
            stroke-dasharray: 120;
            stroke-dashoffset: 120;
            animation: trace2 2.5s ease-in-out infinite;
          }
          .trace-3 {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: trace3 2.5s ease-in-out infinite;
          }
        `}
      </style>
      {/* Background fill at low opacity */}
      <path
        fill="currentColor"
        opacity="0.1"
        d="M109.7,0h-28.6c-4.2,0-7.7,3.4-7.7,7.7v27.5c0,.8-.7,1.5-1.5,1.5h-28V7.7c0-4.2-3.4-7.7-7.7-7.7H7.7C3.5,0,0,3.4,0,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h29v29.5H7.7c-4.2,0-7.7,3.4-7.7,7.7v28.6c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7v-29h28c.8,0,1.5.7,1.5,1.5v27.5c0,4.2,3.4,7.7,7.7,7.7h28.6c4.2,0,7.7-3.4,7.7-7.7V7.7c0-4.2-3.4-7.7-7.7-7.7M36.7,107.7c0,1.3-1.1,2.4-2.4,2.4H9.6c-1.3,0-2.4-1.1-2.4-2.4v-24.7c0-1.3,1.1-2.4,2.4-2.4h27.1v27.1h0ZM36.7,36.7H9.6c-1.3,0-2.4-1.1-2.4-2.4V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v27.1h0ZM110.1,107.7c0,1.3-1.1,2.4-2.4,2.4h-24.7c-1.3,0-2.4-1.1-2.4-2.4v-26.6c0-4.2-3.4-7.7-7.7-7.7h-29v-29.5h29c4.2,0,7.7-3.4,7.7-7.7V9.6c0-1.3,1.1-2.4,2.4-2.4h24.7c1.3,0,2.4,1.1,2.4,2.4v98.1h0Z"
      />
      {/* Upper-left square - traces first */}
      <rect
        className="trace-1"
        x="7"
        y="7"
        width="30"
        height="30"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Lower-left square - traces second */}
      <rect
        className="trace-2"
        x="7"
        y="80"
        width="30"
        height="30"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Right side shape - traces third */}
      <path
        className="trace-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 83 7
           L 108 7
           L 108 110
           L 83 110
           L 83 81
           L 73 81
           C 69 81, 66 78, 66 74
           L 66 44
           C 66 40, 69 37, 73 37
           L 83 37
           Z"
      />
    </svg>
  )
}

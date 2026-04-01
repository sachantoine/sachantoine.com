"use client"

import { track } from "@vercel/analytics"
import type { AnchorHTMLAttributes } from "react"

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string
  properties?: Record<string, string | number>
}

function fire(event: string, properties?: Record<string, string | number>) {
  track(event, properties)
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties }),
  }).catch(() => {})
}

export default function TrackableLink({ event, properties, onClick, children, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        fire(event, properties)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}

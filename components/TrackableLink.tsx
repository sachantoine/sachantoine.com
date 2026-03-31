"use client"

import { track } from "@vercel/analytics"
import type { AnchorHTMLAttributes } from "react"

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: string
  properties?: Record<string, string | number>
}

export default function TrackableLink({ event, properties, onClick, children, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, properties)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}

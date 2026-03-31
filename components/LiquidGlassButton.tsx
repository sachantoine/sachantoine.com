"use client"

import React from "react"

interface BaseProps {
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AnchorProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type LiquidGlassButtonProps = ButtonProps | AnchorProps

export default function LiquidGlassButton({ children, className = "", ...props }: LiquidGlassButtonProps) {
  const base = `relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium
    cursor-pointer transition-transform duration-300 hover:scale-105
    disabled:pointer-events-none disabled:opacity-50 ${className}`

  const inner = (
    <>
      {/* Shadow/border glass layer */}
      <div className="absolute inset-0 z-0 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
      {/* Backdrop distortion layer */}
      <div
        className="absolute inset-0 -z-10 isolate overflow-hidden rounded-lg"
        style={{ backdropFilter: 'url("#liquid-glass-filter")' }}
      />
      <span className="relative z-10">{children}</span>
    </>
  )

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as AnchorProps
    return <a href={href} className={base} {...rest}>{inner}</a>
  }

  const { ...rest } = props as ButtonProps
  return <button className={base} {...rest}>{inner}</button>
}

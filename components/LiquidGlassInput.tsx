"use client"

import React from "react"

const glassShadow = "pointer-events-none absolute inset-0 z-0 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"
const glassBackdrop = "pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-lg"
const fieldBase = "relative z-10 w-full bg-transparent px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none"

type InputProps   = React.InputHTMLAttributes<HTMLInputElement>   & { as?: "input" }
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea"; rows?: number }
type SelectProps  = React.SelectHTMLAttributes<HTMLSelectElement>  & { as: "select"; children: React.ReactNode }

type LiquidGlassInputProps = (InputProps | TextareaProps | SelectProps) & { wrapperClassName?: string }

export default function LiquidGlassInput({ wrapperClassName = "", ...props }: LiquidGlassInputProps) {
  const as = props.as ?? "input"

  return (
    <div className={`relative rounded-lg ${wrapperClassName}`}>
      <div className={glassShadow} />
      <div className={glassBackdrop} style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
      {as === "textarea" ? (
        <textarea {...(props as TextareaProps)} className={`${fieldBase} resize-none`} />
      ) : as === "select" ? (
        <select {...(props as SelectProps)} className={`${fieldBase} cursor-pointer`}>
          {(props as SelectProps).children}
        </select>
      ) : (
        <input {...(props as InputProps)} className={fieldBase} />
      )}
    </div>
  )
}

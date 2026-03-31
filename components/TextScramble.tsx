"use client"

import { useState, useCallback, useRef, useEffect } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

interface TextScrambleProps {
  text: string
  className?: string
}

export default function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameRef = useRef(0)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    const duration = text.length * 3

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const revealedLength = Math.floor((frameRef.current / duration) * text.length)

      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < revealedLength) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )

      if (frameRef.current >= duration) {
        clearInterval(intervalRef.current!)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }, [text])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <span
      className={className}
      onMouseEnter={scramble}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={
            isScrambling && char !== text[i]
              ? "text-[var(--blue-light)]"
              : undefined
          }
        >
          {char}
        </span>
      ))}
    </span>
  )
}

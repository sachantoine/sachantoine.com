"use client"
import Link from "next/link"
import { useState } from "react"

const links = [
  { label: "About", href: "#about" },
  { label: "Store", href: "#store" },
  { label: "Gear", href: "#gear" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Pricing Calculator", href: "/tools" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight text-white">
          sacha antoine
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-white transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-white transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-white/5 px-6 pb-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

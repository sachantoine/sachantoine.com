"use client"
import { useState } from "react"
import { track } from "@vercel/analytics"
import { siteConfig } from "@/data/config"
import LiquidGlassButton from "@/components/LiquidGlassButton"
import LiquidGlassInput from "@/components/LiquidGlassInput"

// To wire up the form:
// 1. Go to formspree.io, create a free account
// 2. Create a new form, copy the form ID
// 3. Replace "YOUR_FORM_ID" below with your actual ID

const FORMSPREE_ID = "mojpaqrl"

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("sent")
        form.reset()
        track("contact_submit", { status: "success" })
      } else {
        setStatus("error")
        track("contact_submit", { status: "error" })
      }
    } catch {
      setStatus("error")
      track("contact_submit", { status: "error" })
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Get in Touch</h2>
            <p className="mt-3 text-neutral-400">
              Open to freelance 3D design work, custom commissions, and software projects. Also happy to chat about collaborations or sponsorships.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.74a4.84 4.84 0 01-1-.05z" />
                </svg>
                DM on TikTok
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <LiquidGlassInput type="text" name="name" placeholder="Name" required />
              <LiquidGlassInput type="email" name="email" placeholder="Email" required />
            </div>
            <LiquidGlassInput type="text" name="subject" placeholder="Subject" required />
            <LiquidGlassInput as="textarea" name="message" placeholder="Message" required rows={5} />

            <LiquidGlassButton
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="px-5 py-3 text-white"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
            </LiquidGlassButton>

            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Email me directly at {siteConfig.email}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

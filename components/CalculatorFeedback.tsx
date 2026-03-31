"use client"
import { useState } from "react"
import LiquidGlassInput from "@/components/LiquidGlassInput"
import LiquidGlassButton from "@/components/LiquidGlassButton"

const FORMSPREE_ID = "mojpaqrl"
const RATINGS = [1, 2, 3, 4, 5]

const glassShadow = "pointer-events-none absolute inset-0 z-0 rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"

export default function CalculatorFeedback() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = new FormData(form)
    data.set("rating", String(rating))

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("sent")
        form.reset()
        setRating(0)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold tracking-tight text-white">Help Me Improve This</h2>
          <p className="mt-2 text-sm text-neutral-400">
            This tool is still being refined. If something feels off, missing, or confusing — let me know.
          </p>

          {status === "sent" ? (
            <div className="relative mt-6 rounded-xl px-5 py-6">
              <div className={glassShadow} />
              <div className="pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-xl" style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
              <p className="relative z-10 text-sm text-neutral-300">Thanks for the feedback — I&apos;ll take a look.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <input type="hidden" name="_subject" value="Pricing Calculator Feedback" />

              <div>
                <p className="mb-2 text-xs font-medium text-neutral-400">How useful was this? <span className="text-neutral-600">(optional)</span></p>
                <div className="flex gap-1">
                  {RATINGS.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      className="p-0.5 text-xl transition-transform hover:scale-110"
                      aria-label={`${star} star`}
                    >
                      <span className={(hovered || rating) >= star ? "text-white" : "text-neutral-700"}>★</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <LiquidGlassInput type="text" name="name" placeholder="Name" />
                <LiquidGlassInput type="email" name="email" placeholder="Email (optional)" />
              </div>

              <LiquidGlassInput
                as="textarea"
                name="message"
                placeholder="What would make this more useful? Any bugs, missing fields, or confusing parts?"
                required
                rows={4}
              />

              <LiquidGlassButton type="submit" disabled={status === "sending"} className="self-start px-5 py-2.5 text-white">
                {status === "sending" ? "Sending..." : "Send Feedback"}
              </LiquidGlassButton>

              {status === "error" && (
                <p className="text-sm text-red-400">Something went wrong. Try again or email me directly.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

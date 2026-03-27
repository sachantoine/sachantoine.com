"use client"
import { useState } from "react"

const FORMSPREE_ID = "mojpaqrl"

const RATINGS = [1, 2, 3, 4, 5]

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

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-white/30"

  return (
    <section className="border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold tracking-tight text-white">Help Me Improve This</h2>
          <p className="mt-2 text-sm text-neutral-400">
            This tool is still being refined. If something feels off, missing, or confusing — let me know.
          </p>

          {status === "sent" ? (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-neutral-300">
              Thanks for the feedback — I'll take a look.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <input type="hidden" name="_subject" value="Pricing Calculator Feedback" />

              {/* Star rating */}
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
                      <span className={(hovered || rating) >= star ? "text-white" : "text-neutral-700"}>
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  className={inputClass}
                />
              </div>

              <textarea
                name="message"
                placeholder="What would make this more useful? Any bugs, missing fields, or confusing parts?"
                required
                rows={4}
                className={inputClass + " resize-none"}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="self-start rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Feedback"}
              </button>

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

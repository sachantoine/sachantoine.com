"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { submitCommission, type CommissionFormState } from "./actions"

const initialState: CommissionFormState = { success: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-80 disabled:opacity-50"
    >
      {pending ? "Submitting..." : "Submit Request"}
    </button>
  )
}

export default function CommissionsPage() {
  const [state, formAction] = useActionState(submitCommission, initialState)

  if (state.success && state.commissionId) {
    return (
      <>
        <Nav />
        <main className="pt-24 px-6 pb-20">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="mb-4 text-4xl">✓</div>
              <h1 className="text-2xl font-bold text-white">Request Received!</h1>
              <p className="mt-3 text-neutral-400">
                Check your email for a confirmation. If you have reference images, reply to that email with them attached.
              </p>
              <div className="mt-6 rounded-lg border border-white/10 bg-black/30 px-6 py-4">
                <p className="text-sm text-neutral-500">Your order ID</p>
                <p className="mt-1 font-mono text-lg font-bold text-white">{state.commissionId}</p>
              </div>
              <a
                href={`/commissions/${state.commissionId}`}
                className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-80"
              >
                Track Your Order
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className="pt-24 px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-white">Custom Commission</h1>
            <p className="mt-3 text-neutral-400">
              Request a custom 3D print or personalized design. Fill out the form below and I'll send you a quote within 48 hours.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: "Custom designs", desc: "New model from scratch" },
                { label: "Personalization", desc: "Name or logo on existing design" },
                { label: "Modifications", desc: "Resize, remix, adapt" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  <span className="text-white">{item.label}</span>
                  <span className="ml-2 text-neutral-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <form action={formAction} className="space-y-5">
            {/* Contact */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">Contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm text-neutral-300">Name <span className="text-neutral-500">*</span></label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-white/30"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm text-neutral-300">Email <span className="text-neutral-500">*</span></label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Commission details */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">Commission Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="type" className="mb-1.5 block text-sm text-neutral-300">Type <span className="text-neutral-500">*</span></label>
                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/30"
                  >
                    <option value="" disabled>Select a type</option>
                    <option value="custom-design">Custom design — new model from scratch</option>
                    <option value="personalized">Personalization — name/logo on existing design</option>
                    <option value="other">Other modification or remix</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="mb-1.5 block text-sm text-neutral-300">Description <span className="text-neutral-500">*</span></label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    placeholder="Describe exactly what you want. Be as specific as possible — dimensions, purpose, style, references, etc. You can attach images by replying to your confirmation email."
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-white/30"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="color" className="mb-1.5 block text-sm text-neutral-300">Color / Filament preference</label>
                    <input
                      id="color"
                      type="text"
                      name="color"
                      placeholder="e.g. Matte black, wood-look, no pref"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="dimensions" className="mb-1.5 block text-sm text-neutral-300">Dimensions / Size</label>
                    <input
                      id="dimensions"
                      type="text"
                      name="dimensions"
                      placeholder={'e.g. 15cm tall, fits a 5" phone'}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="quantity" className="mb-1.5 block text-sm text-neutral-300">Quantity</label>
                    <input
                      id="quantity"
                      type="number"
                      name="quantity"
                      defaultValue={1}
                      min={1}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="deadline" className="mb-1.5 block text-sm text-neutral-300">Deadline</label>
                    <input
                      id="deadline"
                      type="text"
                      name="deadline"
                      placeholder="e.g. ASAP, no rush, by April 15"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-white/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            {state.error && (
              <p className="text-sm text-red-400">{state.error}</p>
            )}

            <SubmitButton />

            <p className="text-center text-xs text-neutral-600">
              You'll receive a quote within 48 hours. No payment until you approve the quote.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

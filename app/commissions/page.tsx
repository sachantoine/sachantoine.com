"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { track } from "@vercel/analytics"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import LiquidGlassInput from "@/components/LiquidGlassInput"
import LiquidGlassButton from "@/components/LiquidGlassButton"
import { submitCommission, type CommissionFormState } from "./actions"
import type { CommissionType } from "@/types/commission"

const initialState: CommissionFormState = { success: false }

const TYPES: { value: CommissionType; label: string; desc: string }[] = [
  { value: "custom-design",  label: "Custom Design",       desc: "New model designed from scratch based on your brief" },
  { value: "personalized",   label: "Personalization",     desc: "Add your name, text, or logo to an existing design" },
  { value: "other",          label: "Other Modification",  desc: "Resize, remix, or modify an existing design" },
]

const glassShadow = "pointer-events-none absolute inset-0 z-0 rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"
const glassBackdrop = "pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-xl"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <LiquidGlassButton type="submit" disabled={pending} className="w-full py-3 text-white">
      {pending ? "Submitting..." : "Submit Request"}
    </LiquidGlassButton>
  )
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-neutral-300">
        {label}{required && <span className="ml-1 text-neutral-500">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function CommissionsPage() {
  const [state, formAction] = useActionState(submitCommission, initialState)
  const [selectedType, setSelectedType] = useState<CommissionType | null>(null)

  if (state.success && state.commissionId) {
    return (
      <>
        <Nav />
        <main className="pt-24 px-6 pb-20">
          <div className="mx-auto max-w-2xl">
            <div className="relative rounded-xl p-8 text-center">
              <div className={glassShadow} />
              <div className={glassBackdrop} style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl">✓</div>
                <h1 className="text-2xl font-bold text-white">Request Received!</h1>
                <p className="mt-3 text-neutral-400">
                  Check your email for a confirmation. If you have reference images, reply to that email with them attached.
                </p>
                <div className="relative mt-6 rounded-lg px-6 py-4">
                  <div className="pointer-events-none absolute inset-0 z-0 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
                  <div className="pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-lg" style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
                  <p className="relative z-10 text-sm text-neutral-500">Your order ID</p>
                  <p className="relative z-10 mt-1 font-mono text-lg font-bold text-white">{state.commissionId}</p>
                </div>
                <LiquidGlassButton href={`/commissions/${state.commissionId}`} className="mt-6 px-6 py-3 text-white">
                  Track Your Order
                </LiquidGlassButton>
              </div>
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
              Request a custom 3D print or personalized design. I&apos;ll send you a quote within 48 hours.
            </p>
          </div>

          <form action={formAction} onSubmit={() => track("commission_submit", { type: selectedType ?? "unknown" })} className="space-y-8">
            {/* Type selection */}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">What do you need?</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setSelectedType(t.value)}
                    className={`relative rounded-xl p-4 text-left transition-all ${selectedType === t.value ? "ring-1 ring-white/40" : ""}`}
                  >
                    <div className={`pointer-events-none absolute inset-0 z-0 rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] ${selectedType === t.value ? "opacity-100" : "opacity-60"}`} />
                    <div className="pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden rounded-xl" style={{ backdropFilter: 'url("#liquid-glass-filter")' }} />
                    <p className={`relative z-10 text-sm font-semibold ${selectedType === t.value ? "text-white" : "text-neutral-300"}`}>{t.label}</p>
                    <p className="relative z-10 mt-1 text-xs text-neutral-500">{t.desc}</p>
                  </button>
                ))}
              </div>
              {selectedType && <input type="hidden" name="type" value={selectedType} />}
            </div>

            {selectedType && (
              <>
                {/* Contact */}
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">Contact</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Name" required>
                      <LiquidGlassInput id="name" type="text" name="name" required placeholder="Your name" />
                    </Field>
                    <Field id="email" label="Email" required>
                      <LiquidGlassInput id="email" type="email" name="email" required placeholder="you@example.com" />
                    </Field>
                  </div>
                </div>

                {/* Type-specific fields */}
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">Commission Details</h2>
                  <div className="space-y-4">

                    {selectedType === "custom-design" && (
                      <>
                        <Field id="description" label="Brief" required>
                          <LiquidGlassInput as="textarea" id="description" name="description" required rows={5}
                            placeholder="Describe the object in detail — what it is, what it's for, the style or look you're after. Reference images can be emailed after submitting." />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field id="dimensions" label="Dimensions / Size">
                            <LiquidGlassInput id="dimensions" type="text" name="dimensions" placeholder={'e.g. 20cm tall, fits a 5" phone'} />
                          </Field>
                          <Field id="color" label="Color / Filament">
                            <LiquidGlassInput id="color" type="text" name="color" placeholder="e.g. Matte black, wood PLA, no pref" />
                          </Field>
                        </div>
                      </>
                    )}

                    {selectedType === "personalized" && (
                      <>
                        <Field id="description" label="Design to personalize" required>
                          <LiquidGlassInput id="description" type="text" name="description" required
                            placeholder="Link to the design on MakerWorld, Printables, or Thingiverse" />
                        </Field>
                        <Field id="dimensions" label="Text / name to add" required>
                          <LiquidGlassInput id="dimensions" type="text" name="dimensions" required
                            placeholder="e.g. 'John', 'Smith Family', your handle" />
                        </Field>
                        <Field id="color" label="Color / Filament">
                          <LiquidGlassInput id="color" type="text" name="color" placeholder="e.g. White base, red text — or no pref" />
                        </Field>
                        <p className="text-xs text-neutral-600">Want a logo instead of text? Reply to your confirmation email with the image file.</p>
                      </>
                    )}

                    {selectedType === "other" && (
                      <>
                        <Field id="description" label="Base design" required>
                          <LiquidGlassInput id="description" type="text" name="description" required
                            placeholder="Link to the design on MakerWorld, Printables, etc." />
                        </Field>
                        <Field id="dimensions" label="What change do you need?" required>
                          <LiquidGlassInput as="textarea" id="dimensions" name="dimensions" required rows={3}
                            placeholder="e.g. Scale it up 150%, add a mounting hole on the back, make the base wider" />
                        </Field>
                        <Field id="color" label="Color / Filament">
                          <LiquidGlassInput id="color" type="text" name="color" placeholder="e.g. Grey, no preference" />
                        </Field>
                      </>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="quantity" label="Quantity">
                        <LiquidGlassInput id="quantity" type="number" name="quantity" defaultValue={1} min={1} />
                      </Field>
                      <Field id="deadline" label="Deadline">
                        <LiquidGlassInput id="deadline" type="text" name="deadline" placeholder="e.g. ASAP, no rush, by April 15" />
                      </Field>
                    </div>
                  </div>
                </div>

                {state.error && <p className="text-sm text-red-400">{state.error}</p>}

                <SubmitButton />

                <p className="text-center text-xs text-neutral-600">
                  No payment until you approve the quote. Quote within 48 hours.
                </p>
              </>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

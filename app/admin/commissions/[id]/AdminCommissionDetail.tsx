"use client"

import { useState, useTransition } from "react"
import type { Commission, CommissionStatus } from "@/types/commission"
import { STATUS_LABELS, TYPE_LABELS } from "@/types/commission"
import { updateCommission } from "./actions"
import Link from "next/link"

const ALL_STATUSES: CommissionStatus[] = [
  "pending",
  "reviewing",
  "quoted",
  "awaiting-payment",
  "paid",
  "printing",
  "shipped",
  "delivered",
  "cancelled",
]

const STATUS_BADGE: Record<CommissionStatus, string> = {
  pending: "bg-neutral-800 text-neutral-300",
  reviewing: "bg-blue-950 text-blue-300",
  quoted: "bg-yellow-950 text-yellow-300",
  "awaiting-payment": "bg-orange-950 text-orange-300",
  paid: "bg-green-950 text-green-300",
  printing: "bg-purple-950 text-purple-300",
  shipped: "bg-sky-950 text-sky-300",
  delivered: "bg-emerald-950 text-emerald-300",
  cancelled: "bg-red-950 text-red-300",
}

export default function AdminCommissionDetail({ commission: initial }: { commission: Commission }) {
  const [commission, setCommission] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  // Local form state
  const [status, setStatus] = useState<CommissionStatus>(commission.status)
  const [adminNotes, setAdminNotes] = useState(commission.adminNotes)
  const [quoteAmount, setQuoteAmount] = useState(commission.quoteAmount?.toString() ?? "")
  const [shopifyUrl, setShopifyUrl] = useState(commission.shopifyDraftOrderUrl)

  function handleSave() {
    setError("")
    setSaved(false)
    startTransition(async () => {
      const result = await updateCommission(commission.id, {
        status,
        adminNotes,
        quoteAmount: quoteAmount ? parseFloat(quoteAmount) : null,
        shopifyDraftOrderUrl: shopifyUrl,
      })
      if (result.error) {
        setError(result.error)
      } else {
        setCommission({ ...commission, status, adminNotes, quoteAmount: quoteAmount ? parseFloat(quoteAmount) : null, shopifyDraftOrderUrl: shopifyUrl })
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    })
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin/commissions" className="text-sm text-neutral-500 hover:text-white transition-colors">
              ← All commissions
            </Link>
            <h1 className="mt-2 font-mono text-xl font-bold text-white">{commission.id}</h1>
            <p className="mt-0.5 text-sm text-neutral-500">
              Submitted {new Date(commission.createdAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_BADGE[commission.status]}`}>
            {STATUS_LABELS[commission.status]}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order details */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">Order Details</h2>
            <dl className="space-y-3">
              {[
                { label: "Name", value: commission.name },
                { label: "Email", value: commission.email, link: `mailto:${commission.email}` },
                { label: "Type", value: TYPE_LABELS[commission.type] },
                { label: "Quantity", value: String(commission.quantity) },
                commission.color && { label: "Color", value: commission.color },
                commission.dimensions && { label: "Dimensions", value: commission.dimensions },
                commission.deadline && { label: "Deadline", value: commission.deadline },
              ]
                .filter(Boolean)
                .map((item) => (
                  <div key={(item as { label: string }).label} className="flex gap-3">
                    <dt className="w-24 shrink-0 text-xs text-neutral-500 pt-0.5">{(item as { label: string }).label}</dt>
                    <dd className="text-sm text-neutral-200">
                      {(item as { link?: string }).link ? (
                        <a href={(item as { link: string }).link} className="hover:text-white transition-colors underline underline-offset-2">
                          {(item as { value: string }).value}
                        </a>
                      ) : (
                        (item as { value: string }).value
                      )}
                    </dd>
                  </div>
                ))}
            </dl>
            <div className="mt-4 border-t border-white/10 pt-4">
              <dt className="text-xs text-neutral-500">Description</dt>
              <dd className="mt-2 text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">{commission.description}</dd>
            </div>
          </div>

          {/* Admin controls */}
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">Manage</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs text-neutral-400">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CommissionStatus)}
                    className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-2.5 text-sm text-white outline-none focus:border-white/30"
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs text-neutral-400">Quote Amount (CAD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs text-neutral-400">Shopify Draft Order URL</label>
                  <input
                    type="url"
                    value={shopifyUrl}
                    onChange={(e) => setShopifyUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs text-neutral-400">Admin Notes</label>
                  <textarea
                    rows={4}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Internal notes (not visible to customer)"
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-white/30"
                  />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                </button>

                <p className="text-xs text-neutral-600 text-center">
                  Changing status will send an email update to the customer.
                </p>
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">Links</h2>
              <div className="space-y-2">
                <a
                  href={`/commissions/${commission.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <span>Customer status page</span>
                  <span className="text-neutral-600">↗</span>
                </a>
                {commission.shopifyDraftOrderUrl && (
                  <a
                    href={commission.shopifyDraftOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>Shopify draft order</span>
                    <span className="text-neutral-600">↗</span>
                  </a>
                )}
                <a
                  href={`mailto:${commission.email}?subject=Re: Commission ${commission.id}`}
                  className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  <span>Email customer</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

import { notFound } from "next/navigation"
import { redis } from "@/lib/redis"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import type { Commission } from "@/types/commission"
import { STATUS_LABELS, STATUS_DESCRIPTIONS, TYPE_LABELS } from "@/types/commission"

const STATUS_ORDER: Commission["status"][] = [
  "pending",
  "reviewing",
  "quoted",
  "awaiting-payment",
  "paid",
  "printing",
  "shipped",
  "delivered",
]

const STATUS_COLORS: Record<Commission["status"], string> = {
  pending: "bg-neutral-500",
  reviewing: "bg-blue-500",
  quoted: "bg-yellow-500",
  "awaiting-payment": "bg-orange-500",
  paid: "bg-green-500",
  printing: "bg-purple-500",
  shipped: "bg-sky-500",
  delivered: "bg-green-400",
  cancelled: "bg-red-500",
}

export default async function CommissionStatusPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const raw = await redis.get<string>(`commission:${id.toUpperCase()}`)
  if (!raw) notFound()

  const commission: Commission = typeof raw === "string" ? JSON.parse(raw) : raw

  const isCancelled = commission.status === "cancelled"
  const currentIndex = STATUS_ORDER.indexOf(commission.status)
  const progressPercent = isCancelled
    ? 100
    : Math.round(((currentIndex + 1) / STATUS_ORDER.length) * 100)

  return (
    <>
      <Nav />
      <main className="pt-24 px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="text-sm text-neutral-500">Order ID</p>
            <h1 className="mt-1 font-mono text-2xl font-bold text-white">{commission.id}</h1>
          </div>

          {/* Status card */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 mb-6">
            <div className="flex items-center gap-3">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_COLORS[commission.status]}`} />
              <span className="font-semibold text-white">{STATUS_LABELS[commission.status]}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-400">{STATUS_DESCRIPTIONS[commission.status]}</p>

            {/* Progress bar */}
            {!isCancelled && (
              <div className="mt-5">
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className="h-1.5 rounded-full bg-white transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-neutral-600">
                  <span>Submitted</span>
                  <span>Delivered</span>
                </div>
              </div>
            )}

            {commission.quoteAmount && (
              <div className="mt-4 rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                <p className="text-sm text-neutral-400">Quote Total</p>
                <p className="mt-0.5 text-lg font-semibold text-white">${commission.quoteAmount.toFixed(2)} CAD</p>
              </div>
            )}

            {commission.shopifyDraftOrderUrl && (commission.status === "quoted" || commission.status === "awaiting-payment") && (
              <a
                href={commission.shopifyDraftOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-80"
              >
                View Invoice & Pay →
              </a>
            )}
          </div>

          {/* Order summary */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500">Order Summary</h2>
            <dl className="space-y-3">
              {[
                { label: "Name", value: commission.name },
                { label: "Type", value: TYPE_LABELS[commission.type] },
                { label: "Quantity", value: String(commission.quantity) },
                commission.color && { label: "Color", value: commission.color },
                commission.dimensions && { label: "Dimensions", value: commission.dimensions },
                commission.deadline && { label: "Deadline", value: commission.deadline },
                {
                  label: "Submitted",
                  value: new Date(commission.createdAt).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                },
              ]
                .filter(Boolean)
                .map((item) => (
                  <div key={(item as { label: string }).label} className="flex gap-4">
                    <dt className="w-28 shrink-0 text-sm text-neutral-500">{(item as { label: string }).label}</dt>
                    <dd className="text-sm text-neutral-200">{(item as { value: string }).value}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-4 border-t border-white/10 pt-4">
              <dt className="text-sm text-neutral-500">Description</dt>
              <dd className="mt-1 text-sm text-neutral-200 leading-relaxed">{commission.description}</dd>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-600">
            Questions? Reply to your confirmation email or DM{" "}
            <a href="https://tiktok.com/@sachantoine_" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              @sachantoine_
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

import { redis } from "@/lib/redis"
import type { Commission } from "@/types/commission"
import { STATUS_LABELS } from "@/types/commission"
import Link from "next/link"

const STATUS_BADGE: Record<Commission["status"], string> = {
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

export const dynamic = "force-dynamic"

export default async function AdminCommissionsPage() {
  const ids = await redis.lrange<string>("commission:ids", 0, -1)

  const commissions: Commission[] = []
  for (const id of ids) {
    const raw = await redis.get<string>(`commission:${id}`)
    if (raw) {
      commissions.push(typeof raw === "string" ? JSON.parse(raw) : raw)
    }
  }

  // Sort newest first
  commissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const counts = commissions.reduce(
    (acc, c) => {
      if (c.status === "pending" || c.status === "reviewing" || c.status === "quoted" || c.status === "awaiting-payment") {
        acc.active++
      } else if (c.status === "delivered") {
        acc.delivered++
      }
      return acc
    },
    { active: 0, delivered: 0 }
  )

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Commissions</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {counts.active} active · {counts.delivered} delivered · {commissions.length} total
            </p>
          </div>
        </div>

        {commissions.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-neutral-500">No commissions yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {commissions.map((c) => (
              <Link
                key={c.id}
                href={`/admin/commissions/${c.id}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/8"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-mono text-sm font-medium text-white shrink-0">{c.id}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{c.name}</p>
                    <p className="truncate text-xs text-neutral-500">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[c.status]}`}>
                    {STATUS_LABELS[c.status]}
                  </span>
                  <span className="text-xs text-neutral-600">
                    {new Date(c.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

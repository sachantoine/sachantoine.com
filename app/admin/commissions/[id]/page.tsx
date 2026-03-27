import { notFound } from "next/navigation"
import { redis } from "@/lib/redis"
import type { Commission } from "@/types/commission"
import AdminCommissionDetail from "./AdminCommissionDetail"

export const dynamic = "force-dynamic"

export default async function AdminCommissionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const raw = await redis.get<string>(`commission:${id.toUpperCase()}`)
  if (!raw) notFound()

  const commission: Commission = typeof raw === "string" ? JSON.parse(raw) : raw

  return <AdminCommissionDetail commission={commission} />
}

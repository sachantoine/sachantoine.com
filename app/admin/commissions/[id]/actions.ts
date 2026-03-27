"use server"

import { redis } from "@/lib/redis"
import { sendStatusUpdate } from "@/lib/email"
import type { Commission, CommissionStatus } from "@/types/commission"
import { revalidatePath } from "next/cache"

export async function updateCommission(
  id: string,
  updates: {
    status?: CommissionStatus
    adminNotes?: string
    quoteAmount?: number | null
    shopifyDraftOrderUrl?: string
  }
) {
  const raw = await redis.get<string>(`commission:${id}`)
  if (!raw) return { error: "Commission not found" }

  const commission: Commission = typeof raw === "string" ? JSON.parse(raw) : raw
  const prevStatus = commission.status

  const updated: Commission = {
    ...commission,
    ...updates,
  }

  await redis.set(`commission:${id}`, JSON.stringify(updated))

  // Send status update email if status changed
  if (updates.status && updates.status !== prevStatus) {
    await sendStatusUpdate(updated)
  }

  revalidatePath(`/admin/commissions/${id}`)
  revalidatePath("/admin/commissions")

  return { success: true }
}

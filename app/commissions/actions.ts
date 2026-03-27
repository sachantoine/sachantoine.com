"use server"

import { redis } from "@/lib/redis"
import { sendCustomerConfirmation, sendAdminNotification } from "@/lib/email"
import type { Commission, CommissionType } from "@/types/commission"

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "CC-"
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

export type CommissionFormState = {
  success: boolean
  commissionId?: string
  error?: string
}

export async function submitCommission(
  _prev: CommissionFormState,
  formData: FormData
): Promise<CommissionFormState> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const type = formData.get("type") as CommissionType
  const description = (formData.get("description") as string)?.trim()
  const color = (formData.get("color") as string)?.trim() ?? ""
  const dimensions = (formData.get("dimensions") as string)?.trim() ?? ""
  const quantity = parseInt(formData.get("quantity") as string, 10) || 1
  const deadline = (formData.get("deadline") as string)?.trim() ?? ""

  if (!name || !email || !type || !description) {
    return { success: false, error: "Please fill in all required fields." }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  const id = generateId()
  const commission: Commission = {
    id,
    createdAt: new Date().toISOString(),
    name,
    email,
    type,
    description,
    color,
    dimensions,
    quantity,
    deadline,
    status: "pending",
    adminNotes: "",
    quoteAmount: null,
    shopifyDraftOrderUrl: "",
  }

  try {
    await redis.set(`commission:${id}`, JSON.stringify(commission))
    await redis.lpush("commission:ids", id)

    await Promise.all([
      sendCustomerConfirmation(commission),
      sendAdminNotification(commission),
    ])

    return { success: true, commissionId: id }
  } catch (err) {
    console.error("Commission submission error:", err)
    return { success: false, error: "Something went wrong. Please try again or email directly." }
  }
}

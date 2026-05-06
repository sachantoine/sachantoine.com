"use server"

import { redis } from "@/lib/redis"
import { sendCustomerConfirmation, sendAdminNotification } from "@/lib/email"
import type { Commission, CommissionType } from "@/types/commission"

function generateId(): string {
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `CC-${digits}`
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
  const rawType = (formData.get("type") as string)?.trim()
  const VALID_TYPES: CommissionType[] = ["custom-design", "personalized", "other"]
  if (!VALID_TYPES.includes(rawType as CommissionType)) {
    return { success: false, error: "Invalid commission type." }
  }
  const type = rawType as CommissionType
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

  // Ensure ID is unique
  let id = generateId()
  let attempts = 0
  while (attempts < 5) {
    const exists = await redis.get(`commission:${id}`)
    if (!exists) break
    id = generateId()
    attempts++
  }

  // Image URLs uploaded client-side via /api/upload before form submission
  let referenceImages: string[] = []
  try {
    const raw = formData.get("imageUrls") as string
    if (raw) referenceImages = JSON.parse(raw)
  } catch { /* ignore */ }

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
    trackingInfo: "",
    referenceImages,
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

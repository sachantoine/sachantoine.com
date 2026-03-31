"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { redis } from "@/lib/redis"
import { headers } from "next/headers"

const MAX_ATTEMPTS = 5
const WINDOW_SECONDS = 15 * 60 // 15 minutes

export async function loginAction(_prev: { error: string }, formData: FormData) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return { error: "Admin access not configured." } as { error: string }

  // Rate limiting by IP
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  const rateLimitKey = `login:fail:${ip}`
  const attempts = (await redis.get<number>(rateLimitKey)) ?? 0

  if (attempts >= MAX_ATTEMPTS) {
    return { error: "Too many failed attempts. Try again in 15 minutes." } as { error: string }
  }

  const password = formData.get("password") as string

  if (password !== adminPassword) {
    await redis.set(rateLimitKey, attempts + 1, { ex: WINDOW_SECONDS })
    return { error: "Incorrect password." } as { error: string }
  }

  // Clear rate limit on successful login
  await redis.del(rateLimitKey)

  // Generate a session token — never store the raw password in the cookie
  const sessionToken = crypto.randomUUID()
  await redis.set(`session:${sessionToken}`, "1", { ex: 60 * 60 * 24 * 7 })

  const cookieStore = await cookies()
  cookieStore.set("admin_auth", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  redirect("/admin/commissions")
}

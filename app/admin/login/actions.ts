"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(_prev: { error: string }, formData: FormData) {
  const password = formData.get("password") as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return { error: "Admin access not configured." } as { error: string }
  }

  if (password !== adminPassword) {
    return { error: "Incorrect password." } as { error: string }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_auth", adminPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  redirect("/admin/commissions")
}

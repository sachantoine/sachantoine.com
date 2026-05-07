import { redis } from "@/lib/redis"
import { NextResponse } from "next/server"
import type { Commission } from "@/types/commission"

export async function POST(request: Request) {
  try {
    const { id, urls } = await request.json()
    if (!id || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ ok: false })
    }

    const raw = await redis.get<string>(`commission:${id}`)
    if (!raw) return NextResponse.json({ ok: false })

    const commission: Commission = typeof raw === "string" ? JSON.parse(raw) : raw
    commission.referenceImages = urls
    await redis.set(`commission:${id}`, JSON.stringify(commission))

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}

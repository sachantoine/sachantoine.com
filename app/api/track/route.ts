import { Redis } from "@upstash/redis"
import { NextRequest, NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// TTL: keep 90 days of analytics
const TTL_SECONDS = 90 * 24 * 60 * 60

export async function POST(req: NextRequest) {
  try {
    const { event, properties } = await req.json()
    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "missing event" }, { status: 400 })
    }

    const date = new Date().toISOString().slice(0, 10) // YYYY-MM-DD UTC
    const key = `analytics:event:${event}:${date}`

    await redis.incr(key)
    await redis.expire(key, TTL_SECONDS)

    // Also store property breakdowns (e.g. which platform was clicked)
    if (properties && typeof properties === "object") {
      for (const [k, v] of Object.entries(properties)) {
        if (typeof v === "string" || typeof v === "number") {
          const propKey = `analytics:prop:${event}:${k}:${v}:${date}`
          await redis.incr(propKey)
          await redis.expire(propKey, TTL_SECONDS)
        }
      }
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "internal" }, { status: 500 })
  }
}

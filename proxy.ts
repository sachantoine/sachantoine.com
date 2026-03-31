import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Redis } from "@upstash/redis"

export const config = {
  matcher: ["/admin/:path*"],
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Login page is always accessible
  if (pathname === "/admin/login") return NextResponse.next()

  const token = request.cookies.get("admin_auth")?.value

  if (token) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
    const valid = await redis.get(`session:${token}`)
    if (valid) return NextResponse.next()
  }

  const loginUrl = new URL("/admin/login", request.url)
  return NextResponse.redirect(loginUrl)
}

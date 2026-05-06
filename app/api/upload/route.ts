import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ urls: [] })
  }

  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const urls: string[] = []

    for (const file of files) {
      if (file && file.size > 0) {
        const { url } = await put(`commissions/${Date.now()}-${file.name}`, file, { access: "public" })
        urls.push(url)
      }
    }

    return NextResponse.json({ urls })
  } catch {
    return NextResponse.json({ urls: [] })
  }
}

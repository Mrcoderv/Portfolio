import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Store data in Blob storage as JSON
    const blob = await put("portfolio-data.json", JSON.stringify(data), {
      access: "public",
      contentType: "application/json",
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error) {
    console.error("Data sync error:", error)
    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Fetch synced data from Blob storage
    const response = await fetch(`${process.env.BLOB_READ_WRITE_TOKEN}/portfolio-data.json`)
    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    }
    return NextResponse.json({})
  } catch (error) {
    console.error("Data fetch error:", error)
    return NextResponse.json({})
  }
}

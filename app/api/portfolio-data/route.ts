import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

const DATA_FILE_NAME = "portfolio-data.json"

export async function GET() {
  try {
    // Try to get existing data
    try {
      const response = await fetch(
        `${process.env.BLOB_READ_WRITE_TOKEN ? "https://blob.vercel-storage.com" : ""}/portfolio-data.json`,
      )
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      }
    } catch (error) {
      // File doesn't exist yet, return default data
    }

    // Return default data structure
    const defaultData = {
      socialLinks: [],
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        website: "",
      },
      projects: [],
      cvUrl: null,
      cvFilename: null,
    }

    return NextResponse.json(defaultData)
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Store data as JSON in Blob storage
    const blob = await put(DATA_FILE_NAME, JSON.stringify(data), {
      access: "public",
      contentType: "application/json",
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error) {
    console.error("Error saving portfolio data:", error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}

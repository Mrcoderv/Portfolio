import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Raghav Vian Panthi - Developer Portfolio",
  description:
    "Computer Applications Student & Developer specializing in Java, Python, JavaScript, and web development. Explore my projects and skills.",
  generator: "v0.app",
  keywords: ["Raghav Panthi", "Developer", "Computer Applications", "Java", "Python", "JavaScript", "Web Development"],
  authors: [{ name: "Raghav Vian Panthi" }],
  openGraph: {
    title: "Raghav Vian Panthi - Developer Portfolio",
    description: "Computer Applications Student & Developer",
    type: "website",
    url: "https://raghavpanthi.com.np",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

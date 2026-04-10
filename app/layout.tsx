import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  title: "Raghav Vian Panthi | AI & Machine Learning Developer Nepal",
  description:
    "Raghav Vian Panthi is a developer from Nepal working in AI, machine learning, and data-driven applications. Explore projects including fintech, NEPSE analysis, and modern web development.",

  generator: "Next.js",
  applicationName: "Raghav Panthi Portfolio",
  referrer: "origin-when-cross-origin",

  keywords: [
    "Raghav Panthi",
    "Raghav Vian Panthi",
    "AI Developer Nepal",
    "Machine Learning Developer",
    "Data Analytics Developer",
    "Python Developer Nepal",
    "Java Developer Nepal",
    "Backend Developer Nepal",
    "AI Projects Nepal",
    "Machine Learning Projects",
    "Data Science Portfolio",
    "Fintech Developer",
    "NEPSE Analysis App",
    "Stock Market Analysis Nepal",
    "AI Fintech Platform",
    "FastAPI Developer",
    "Flask Developer",
    "Spring Boot Developer",
    "React Developer",
    "Next.js Developer",
    "Software Developer Nepal",
    "Developer Portfolio",
    "Tech Portfolio Nepal",
    "Omdena Contributor",
    "AI Portfolio",
    "Data Driven Applications",
    "Modern Web Development",
    "Tech Blog Nepal"
  ],

  authors: [{ name: "Raghav Vian Panthi", url: "https://raghavpanthi.com.np" }],
  creator: "Raghav Vian Panthi",
  publisher: "Raghav Vian Panthi",

  metadataBase: new URL("https://raghavpanthi.com.np"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Raghav Vian Panthi | AI & Machine Learning Developer",
    description:
      "Explore AI, machine learning, and fintech projects by Raghav Vian Panthi, including NEPSE analysis and data-driven applications.",
    type: "website",
    url: "https://raghavpanthi.com.np",
    siteName: "Raghav Panthi Portfolio",
    images: [
      {
        url: "/media/professional-headshot-of-a-young-developer-with-gl.jpg",
        width: 1200,
        height: 630,
        alt: "Raghav Vian Panthi - AI Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Raghav Vian Panthi | AI Developer",
    description:
      "AI, machine learning, and fintech projects from Nepal. Explore portfolio and technical work.",
    images: ["/media/professional-headshot-of-a-young-developer-with-gl.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "your-google-verification-code",
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

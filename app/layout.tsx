import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Raghav Vian Panthi - Full Stack Developer & Computer Science Student",
  description:
    "Raghav Vian Panthi is a passionate Computer Applications student and full-stack developer from Nepal specializing in Java, Python, JavaScript, React, Next.js, and modern web development. Explore my portfolio, projects, and technical blog posts.",
  generator: "Next.js",
  applicationName: "Raghav Panthi Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Raghav Panthi",
    "Raghav Vian Panthi",
    "Full Stack Developer",
    "Computer Applications Student",
    "Nepal Developer",
    "Java Developer",
    "Python Developer",
    "JavaScript Developer",
    "React Developer",
    "Next.js Developer",
    "Web Development",
    "Software Engineer",
    "Portfolio",
    "Byte Space Nepal",
    "Programming",
    "Technology Blog",
  ],
  authors: [{ name: "Raghav Vian Panthi", url: "https://raghavpanthi.com.np" }],
  creator: "Raghav Vian Panthi",
  publisher: "Raghav Vian Panthi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://raghavpanthi.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Raghav Vian Panthi - Full Stack Developer & Computer Science Student",
    description:
      "Passionate Computer Applications student and full-stack developer from Nepal. Explore my portfolio, projects, and technical expertise in modern web development.",
    type: "website",
    locale: "en_US",
    url: "https://raghavpanthi.com.np",
    siteName: "Raghav Panthi Portfolio",
    images: [
      {
        url: "/professional-headshot-of-a-young-developer-with-gl.jpg",
        width: 1200,
        height: 630,
        alt: "Raghav Vian Panthi - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Vian Panthi - Full Stack Developer",
    description:
      "Computer Applications student and full-stack developer from Nepal specializing in modern web development.",
    images: ["/professional-headshot-of-a-young-developer-with-gl.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
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

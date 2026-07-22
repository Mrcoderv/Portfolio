"use client"

import { useEffect, useState } from "react"

export function BlogSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Latest Blog <span className="text-primary">Posts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles and insights from Raghav Panthi on technology, data science, and web development
          </p>
        </div>

        <div className="w-full rounded-lg border border-border overflow-hidden shadow-lg animate-fade-in-up">
          <iframe
            src="https://bytespacenepal.com/author/raghavapanthi/"
            title="Blog Posts by Raghav Panthi"
            className="w-full border-0"
            style={{ height: isMobile ? "400px" : "600px" }}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          <a
            href="https://bytespacenepal.com/author/raghavapanthi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View all articles on Byte Space Nepal →
          </a>
        </p>
      </div>
    </section>
  )
}

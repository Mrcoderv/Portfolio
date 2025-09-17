"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin, Laptop, Rocket, Instagram, Twitter, Code } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [socialLinks, setSocialLinks] = useState<Array<{ platform: string; url: string; username: string }>>([])
  const [cvUrl, setCvUrl] = useState<string>("")

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from server first
        const response = await fetch("/api/portfolio-data")
        if (response.ok) {
          const data = await response.json()
          setSocialLinks(data.socialLinks || [])
          setCvUrl(data.cvUrl || "")
        } else {
          // Fallback to localStorage
          const savedSocialLinks = localStorage.getItem("socialLinks")
          const savedCvUrl = localStorage.getItem("cvUrl")

          if (savedSocialLinks) {
            setSocialLinks(JSON.parse(savedSocialLinks))
          }
          if (savedCvUrl) {
            setCvUrl(savedCvUrl)
          }
        }
      } catch (error) {
        console.error("Error loading data:", error)
        // Fallback to localStorage
        const savedSocialLinks = localStorage.getItem("socialLinks")
        const savedCvUrl = localStorage.getItem("cvUrl")

        if (savedSocialLinks) {
          setSocialLinks(JSON.parse(savedSocialLinks))
        }
        if (savedCvUrl) {
          setCvUrl(savedCvUrl)
        }
      }
    }

    loadData()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDownloadCV = () => {
    if (cvUrl) {
      const link = document.createElement("a")
      link.href = cvUrl
      link.download = "Raghav_Vian_Panthi_CV.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "twitter":
      case "x":
        return <Twitter className="h-5 w-5" />
      case "leetcode":
        return <Code className="h-5 w-5" />
      default:
        return <Github className="h-5 w-5" />
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <p className="text-secondary font-medium">Hello, I'm</p>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Raghav Vian <span className="text-primary">Panthi</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">Computer Applications Student & Developer</p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Highly motivated and result-driven Bachelor of Computer Applications (BCA) student with a strong
              foundation in computer science and programming. Passionate about software development, AI, and data
              analysis.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollToSection("contact")} className="bg-primary hover:bg-primary/90">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
              <Button variant="outline" onClick={handleDownloadCV} disabled={!cvUrl}>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex gap-3 pt-4">
                <p className="text-sm text-muted-foreground self-center mr-2">Follow me:</p>
                {socialLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="hover:text-primary hover:border-primary transition-colors bg-transparent"
                    asChild
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${link.platform} profile`}
                      title={`@${link.username} on ${link.platform}`}
                    >
                      {getSocialIcon(link.platform)}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-2 animate-float">
                <div className="w-full h-full rounded-full overflow-hidden bg-card">
                  <img
                    src="/professional-headshot-of-a-young-developer-with-gl.jpg"
                    alt="Raghav Vian Panthi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 border-2 border-primary/30 rounded-full flex items-center justify-center animate-pulse">
                <Laptop className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/20 border-2 border-secondary/30 rounded-full flex items-center justify-center animate-pulse delay-1000">
                <Rocket className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

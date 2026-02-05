"use client"

import React, { useState, useEffect } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialLink {
  id: string
  platform: string
  username: string
  url: string
  icon: string
}

interface ContactInfo {
  id: string
  type: "email" | "phone" | "location" | "website"
  label: string
  value: string
  icon: string
}

interface CVInfo {
  id: string
  filename: string
  uploadDate: string
  url?: string
  fileSize?: string
  description?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [cvInfo, setCvInfo] = useState<CVInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)

  useEffect(() => {
    void loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/portfolio-data")
      if (response.ok) {
        const data = await response.json()
        setSocialLinks(data.socialLinks || [])
        setContactInfo(data.contactInfo ? [data.contactInfo] : [])
        setCvInfo(
          data.cvUrl
            ? {
                url: data.cvUrl,
                filename: data.cvFilename || "Resume.pdf",
                uploadDate: new Date().toISOString(),
                id: "cv-1",
              }
            : null,
        )
      } else {
        // fallback to localStorage
        const savedSocialLinks = localStorage.getItem("portfolio-social-links")
        const savedContactInfo = localStorage.getItem("portfolio-contact-info")
        const savedCV = localStorage.getItem("portfolio-cv")

        if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks))
        if (savedContactInfo) setContactInfo(JSON.parse(savedContactInfo))
        if (savedCV) setCvInfo(JSON.parse(savedCV))
      }
    } catch (err) {
      console.error("Error loading portfolio data:", err)
      const savedSocialLinks = localStorage.getItem("portfolio-social-links")
      const savedContactInfo = localStorage.getItem("portfolio-contact-info")
      const savedCV = localStorage.getItem("portfolio-cv")

      if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks))
      if (savedContactInfo) setContactInfo(JSON.parse(savedContactInfo))
      if (savedCV) setCvInfo(JSON.parse(savedCV))
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(null)

    try {
      // Example: send to Formspree (replace with your API as needed)
      const res = await fetch("https://formspree.io/f/mwvqgjrw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitSuccess(false)
      }
    } catch (err) {
      console.error("Submit error:", err)
      setSubmitSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayContactInfo =
    contactInfo.length > 0
      ? contactInfo
      : [
          { id: "1", type: "email", label: "Email", value: "Raghavap.339@gmail.com", icon: "Mail" },
        ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-card border rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-4">Contact Information</h3>

        {displayContactInfo.map((info) => {
          const Icon = iconMap[info.icon] || Mail
          return (
            <div key={info.id} className="flex items-center gap-4 mb-4">
              <Icon className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-medium">{info.label}</p>
                <p className="text-sm text-muted-foreground">{info.value}</p>
              </div>
            </div>
          )
        })}

        {socialLinks.length > 0 && (
          <div className="pt-6 border-t">
            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon] || Globe
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{link.platform}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="bg-card border rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6">Send Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="What's this about?"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Write your message..."
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            {submitSuccess === true && <span className="text-success">Sent!</span>}
            {submitSuccess === false && <span className="text-destructive">Failed to send</span>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactSection

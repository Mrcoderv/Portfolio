"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  Download,
  FileText,
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

  useEffect(() => {
    const savedSocialLinks = localStorage.getItem("portfolio-social-links")
    const savedContactInfo = localStorage.getItem("portfolio-contact-info")
    const savedCV = localStorage.getItem("portfolio-cv")

    if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks))
    if (savedContactInfo) setContactInfo(JSON.parse(savedContactInfo))
    if (savedCV) setCvInfo(JSON.parse(savedCV))
  }, [])

  const displayContactInfo =
    contactInfo.length > 0
      ? contactInfo
      : [
          { id: "1", type: "email" as const, label: "Email", value: "raghavs.33@gmail.com", icon: "Mail" },
          { id: "2", type: "phone" as const, label: "WhatsApp", value: "+977 9866563776", icon: "Phone" },
          { id: "3", type: "location" as const, label: "Location", value: "Nepal", icon: "MapPin" },
        ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleDownloadCV = () => {
    // In production, this would download the actual file from Vercel Blob
    // For now, we'll show an alert with instructions
    if (cvInfo) {
      alert(`CV download would start here. File: ${cvInfo.filename}`)
    } else {
      alert("No CV available for download. Please contact me directly for my resume.")
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing
            together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                technology and development. Feel free to reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              {displayContactInfo.map((info) => {
                const IconComponent = iconMap[info.icon] || Mail
                return (
                  <div key={info.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Resume/CV</h4>
                {cvInfo && (
                  <Button onClick={handleDownloadCV} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                )}
              </div>
              {cvInfo ? (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{cvInfo.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated: {new Date(cvInfo.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  CV will be available for download soon. Please contact me directly for my resume.
                </p>
              )}
            </div>

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

          {/* Contact Form */}
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
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello!"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react"

interface Contact {
  id: string
  type: "email" | "phone" | "linkedin" | "github" | "website"
  label: string
  value: string
  url?: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: string
  endYear: string
  description?: string
}

export function AboutSection() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [education, setEducation] = useState<Education[]>([])

  // Default contact info as fallback
  const defaultContacts: Contact[] = [
    {
      id: "default-1",
      type: "email",
      label: "Email",
      value: "raghavs.33@gmail.com",
    },
    {
      id: "default-2",
      type: "phone",
      label: "WhatsApp",
      value: "+977 9866563776",
    },
  ]

  useEffect(() => {
    const savedContacts = localStorage.getItem("portfolio-contacts")
    const savedEducation = localStorage.getItem("portfolio-education")

    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts)
      if (parsedContacts.length > 0) {
        setContacts(parsedContacts)
      } else {
        setContacts(defaultContacts)
      }
    } else {
      setContacts(defaultContacts)
    }

    if (savedEducation) {
      setEducation(JSON.parse(savedEducation))
    }
  }, [])

  const getContactIcon = (type: string) => {
    switch (type) {
      case "email":
        return Mail
      case "phone":
        return Phone
      case "linkedin":
        return Linkedin
      case "github":
        return Github
      case "website":
        return Globe
      default:
        return User
    }
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, passion, and what drives me in the world of technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src="/professional-photo-of-raghav-panthi--computer-scie.jpg"
                  alt="Raghav Vian Panthi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Who am I?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am a highly motivated and result-driven Bachelor of Computer Applications (BCA) student with a strong
                foundation in computer science and programming. I am proficient in Java, C, HTML, CSS, JavaScript, and
                Python, with a passion for software development, AI, and data analysis.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Experienced in developing both command line and web-based applications, and eager to apply my technical
                skills to real-world projects. I thrive in collaborative environments and am always looking to learn new
                technologies and methodologies.
              </p>
            </div>

            {/* Education Section */}
            {education.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Education</h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <Card key={edu.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startYear} - {edu.endYear}
                        </p>
                        {edu.description && <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info Cards */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">Raghav Vian Panthi</p>
                    </div>
                  </CardContent>
                </Card>

                {contacts.map((contact) => {
                  const IconComponent = getContactIcon(contact.type)
                  return (
                    <Card key={contact.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.label}</p>
                          {contact.url ? (
                            <a
                              href={contact.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{contact.value}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Nepal</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

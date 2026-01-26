"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ExternalLink } from "lucide-react"

interface Certificate {
  id: string
  title: string
  organization: string
  issueDate: string
  expirationDate?: string
  certificateUrl?: string
}

export function CertificatesSection() {
  const certificates: Certificate[] = [
    {
      id: "cert-1",
      title: "AI Innovation Challenge – ULog",
      organization: "Omdena",
      issueDate: "Dec 2025",
      certificateUrl: "https://confirm.omdena.com/INlvelj",
    },
    {
      id: "cert-2",
      title: "Innovation Challenge Bhutan — Building ClimateSense: Leveraging AI to Combat Climate Change in Bhutan",
      organization: "Omdena",
      issueDate: "Nov 2025",
      certificateUrl: "https://www.linkedin.com/in/raghav-vian-panthi/overlay/1763464094496/single-media-viewer/?profileId=ACoAAEnduuABDcDhS1G36g45-yBxlTgfhCrGqa0",
    },
    {
      id: "cert-3",
      title: "Omdena's Foundational Data Science Course",
      organization: "Omdena",
      issueDate: "Nov 2025",
      certificateUrl: "https://confirm.omdena.com/ACqp3es",
    },
    {
      id: "cert-4",
      title: "Responsive Web Design",
      organization: "freeCodeCamp",
      issueDate: "Oct 2024",
      certificateUrl: "https://www.freecodecamp.org/certification/fcc7f127ddc-2767-40c0-b9fb-7bad2aa68e64/responsive-web-design",
    },
  ]

  return (
    <section id="certificates" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Certifications &amp; <span className="text-primary">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements earned through continuous learning and practical application.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">{cert.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{cert.organization}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col gap-2 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Issued</p>
                      <p className="text-sm text-foreground">{cert.issueDate}</p>
                    </div>
                    {cert.expirationDate && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Expires</p>
                        <p className="text-sm text-foreground">{cert.expirationDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                {cert.certificateUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between bg-transparent hover:bg-primary/5"
                    asChild
                  >
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                      <span>View Certificate</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
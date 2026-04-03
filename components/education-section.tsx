"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar } from "lucide-react"

interface Education {
  id: string
  school: string
  degree: string
  field: string
  startYear: number
  endYear: number
  status: "pursuing" | "completed"
  gpa?: string
  description: string
}

export function EducationSection() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const response = await fetch("/Content/education.json")
        const data: Education[] = await response.json()
        setEducation(data)
      } catch (error) {
        console.error("Failed to load education data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadEducation()
  }, [])

  if (loading) {
    return (
      <section id="education" className="py-20">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">Loading education details...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            My <span className="text-primary">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Academic background and educational achievements in computer science and applications
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            >
              <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 border-l-primary relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary" />

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{edu.degree}</CardTitle>
                          <p className="text-sm text-muted-foreground">{edu.school}</p>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={edu.status === "pursuing" ? "default" : "secondary"}
                      className="whitespace-nowrap"
                    >
                      {edu.status === "pursuing" ? "Currently Pursuing" : "Completed"}
                    </Badge>
                  </div>
                </CardHeader>

                {expandedId === edu.id && (
                  <CardContent className="space-y-4 animate-scale-in">
                    <p className="text-muted-foreground">{edu.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Field</p>
                        <p className="text-sm font-medium">{edu.field}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Duration</p>
                        <p className="text-sm font-medium">{edu.startYear} - {edu.endYear}</p>
                      </div>
                      {edu.gpa && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">GPA</p>
                          <p className="text-sm font-medium">{edu.gpa}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

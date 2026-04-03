"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Code, Database, Globe, BarChart3 } from "lucide-react"

interface Skill {
  name: string
  level: number
  description?: string
}

interface SkillCategory {
  title: string
  icon: string
  skills: Skill[]
}

interface SkillsData {
  skillCategories: SkillCategory[]
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="h-5 w-5 text-primary" />,
  BarChart3: <BarChart3 className="h-5 w-5 text-primary" />,
  Globe: <Globe className="h-5 w-5 text-primary" />,
  Database: <Database className="h-5 w-5 text-primary" />,
}

export function SkillsSection() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"name" | "level">("name")

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch("/Content/skills.json")
        const data: SkillsData = await response.json()
        setSkillCategories(data.skillCategories)
      } catch (error) {
        console.error("Failed to load skills:", error)
        setSkillCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])

  const sortedSkillCategories = skillCategories.map((category) => ({
    ...category,
    skills: [...category.skills].sort((a, b) => {
      if (sortBy === "level") {
        return b.level - a.level
      }
      return a.name.localeCompare(b.name)
    }),
  }))

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground">Loading skills...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels across various technologies and
            tools.
          </p>

          {/* Sort Options */}
          <div className="flex gap-2 justify-center mt-8">
            <Button
              variant={sortBy === "name" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("name")}
              className="transition-all"
            >
              Sort by Name
            </Button>
            <Button
              variant={sortBy === "level" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("level")}
              className="transition-all"
            >
              Sort by Level
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {sortedSkillCategories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {iconMap[category.icon]}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <span className="font-medium">{skill.name}</span>
                        {skill.description && (
                          <p className="text-xs text-muted-foreground">{skill.description}</p>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

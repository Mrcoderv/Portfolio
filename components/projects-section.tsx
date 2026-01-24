"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])

  // Default projects as fallback
  const defaultProjects = [
    {
      id: "default-1",
      title: "Climate Analytics Platform (Omdena)",
      description:
        "Built an end-to-end climate analytics platform to predict and visualize climate impacts across Nepal with interactive dashboards and actionable insights.",
      imageUrl: "/climate-data-visualization-dashboard-with-charts-a.jpg",
      technologies: ["Python", "Streamlit", "Pandas", "Visualization"],
      githubUrl: "https://github.com/Mrcoderv",
      liveUrl: "#",
    },
    {
      id: "default-2",
      title: "ULOG: Log Normalization Pipeline (Omdena)",
      description:
        "Contributing to development of a robust log normalization and classification system with data preprocessing and feature extraction.",
      imageUrl: "/data-processing-pipeline-illustration.jpg",
      technologies: ["Python", "Data Processing", "ML", "Git"],
      githubUrl: "https://github.com/Mrcoderv",
      liveUrl: "#",
    },
    {
      id: "default-3",
      title: "JavaFX Ball Shot Game",
      description:
        "Designed and developed a 2D Ball Shooting Game using JavaFX with physics-based mechanics and intuitive user interaction.",
      imageUrl: "/java-gui-guessing-game-with-buttons-and-text-field.jpg",
      technologies: ["Java", "JavaFX", "Physics Engine"],
      githubUrl: "https://github.com/Mrcoderv/JavaFXExample",
      liveUrl: "#",
    },
    {
      id: "default-4",
      title: "Hamro Yatra - Tourist Management System",
      description:
        "Developed a comprehensive tourism and travel management system for Nepal with booking, authentication, and package management features.",
      imageUrl: "/tourist-management-system-dashboard-with-booking-i.jpg",
      technologies: ["Spring Boot", "Next.js", "React", "MySQL"],
      githubUrl: "https://github.com/Mrcoderv/HamroYatra",
      liveUrl: "#",
    },
    {
      id: "default-5",
      title: "Portfolio Website",
      description: "A responsive personal portfolio website showcasing projects, skills, and professional experience with modern design.",
      imageUrl: "/modern-portfolio-website-with-clean-design-and-pro.jpg",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/Mrcoderv",
      liveUrl: "https://raghavpanthi.com.np",
    },
    {
      id: "default-6",
      title: "ClimateSense AI for Climate Change",
      description:
        "Collaborated on climate analytics and prediction modeling for Bhutan with data preprocessing, feature engineering, and performance evaluation.",
      imageUrl: "/climate-data-visualization-dashboard-with-charts-a.jpg",
      technologies: ["Python", "Machine Learning", "Data Analysis", "Collaboration"],
      githubUrl: "https://github.com/Mrcoderv",
      liveUrl: "#",
    },
  ]

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio-projects")
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects)
      if (parsedProjects.length > 0) {
        setProjects(parsedProjects)
      } else {
        setProjects(defaultProjects)
      }
    } else {
      setProjects(defaultProjects)
    }
  }, [])

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and projects that demonstrate my skills in various technologies and domains.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

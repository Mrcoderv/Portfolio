"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Plus, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
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

interface Contact {
  id: string
  type: "email" | "phone" | "linkedin" | "github" | "website"
  label: string
  value: string
  url?: string
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content?: string
  author: string
  publishedAt: string
  tags: string[]
  url?: string
  imageUrl?: string
  source: "manual"
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio-projects")
    const savedEducation = localStorage.getItem("portfolio-education")
    const savedContacts = localStorage.getItem("portfolio-contacts")
    const savedBlogPosts = localStorage.getItem("portfolio-blog-posts")

    if (savedProjects) setProjects(JSON.parse(savedProjects))
    if (savedEducation) setEducation(JSON.parse(savedEducation))
    if (savedContacts) setContacts(JSON.parse(savedContacts))
    if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts))

    const authStatus = sessionStorage.getItem("admin-authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    if (password === "admin123") {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin-authenticated", "true")
    } else {
      alert("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin-authenticated")
    router.push("/")
  }

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    localStorage.setItem("portfolio-projects", JSON.stringify(newProjects))
  }

  const saveEducation = (newEducation: Education[]) => {
    setEducation(newEducation)
    localStorage.setItem("portfolio-education", JSON.stringify(newEducation))
  }

  const saveContacts = (newContacts: Contact[]) => {
    setContacts(newContacts)
    localStorage.setItem("portfolio-contacts", JSON.stringify(newContacts))
  }

  const saveBlogPosts = (newBlogPosts: BlogPost[]) => {
    setBlogPosts(newBlogPosts)
    localStorage.setItem("portfolio-blog-posts", JSON.stringify(newBlogPosts))
  }

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const technologies = (formData.get("technologies") as string).split(",").map((t) => t.trim())

    const projectData: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies,
      githubUrl: (formData.get("githubUrl") as string) || undefined,
      liveUrl: (formData.get("liveUrl") as string) || undefined,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
    }

    if (editingProject) {
      saveProjects(projects.map((p) => (p.id === editingProject.id ? projectData : p)))
    } else {
      saveProjects([...projects, projectData])
    }

    setEditingProject(null)
  }

  const handleEducationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const educationData: Education = {
      id: editingEducation?.id || Date.now().toString(),
      institution: formData.get("institution") as string,
      degree: formData.get("degree") as string,
      field: formData.get("field") as string,
      startYear: formData.get("startYear") as string,
      endYear: formData.get("endYear") as string,
      description: (formData.get("description") as string) || undefined,
    }

    if (editingEducation) {
      saveEducation(education.map((e) => (e.id === editingEducation.id ? educationData : e)))
    } else {
      saveEducation([...education, educationData])
    }

    setEditingEducation(null)
  }

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const contactData: Contact = {
      id: editingContact?.id || Date.now().toString(),
      type: formData.get("type") as Contact["type"],
      label: formData.get("label") as string,
      value: formData.get("value") as string,
      url: (formData.get("url") as string) || undefined,
    }

    if (editingContact) {
      saveContacts(contacts.map((c) => (c.id === editingContact.id ? contactData : c)))
    } else {
      saveContacts([...contacts, contactData])
    }

    setEditingContact(null)
  }

  const handleBlogPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const tags = (formData.get("tags") as string).split(",").map((t) => t.trim())

    const blogPostData: BlogPost = {
      id: editingBlogPost?.id || Date.now().toString(),
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: (formData.get("content") as string) || undefined,
      author: formData.get("author") as string,
      publishedAt: formData.get("publishedAt") as string,
      tags,
      url: (formData.get("url") as string) || undefined,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      source: "manual",
    }

    if (editingBlogPost) {
      saveBlogPosts(blogPosts.map((p) => (p.id === editingBlogPost.id ? blogPostData : p)))
    } else {
      saveBlogPosts([...blogPosts, blogPostData])
    }

    setEditingBlogPost(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-primary">Admin Login</CardTitle>
            <CardDescription>Enter password to access admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Portfolio Admin</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/")}>
              <Eye className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Projects</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingProject(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                    <DialogDescription>Fill in the project details below</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={editingProject?.title} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                        <Input
                          id="technologies"
                          name="technologies"
                          defaultValue={editingProject?.technologies.join(", ")}
                          placeholder="React, TypeScript, Node.js"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingProject?.description}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <Input id="githubUrl" name="githubUrl" type="url" defaultValue={editingProject?.githubUrl} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="liveUrl">Live URL</Label>
                        <Input id="liveUrl" name="liveUrl" type="url" defaultValue={editingProject?.liveUrl} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input id="imageUrl" name="imageUrl" type="url" defaultValue={editingProject?.imageUrl} />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingProject ? "Update Project" : "Add Project"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Project</DialogTitle>
                              <DialogDescription>Update the project details below</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleProjectSubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="title">Title</Label>
                                  <Input id="title" name="title" defaultValue={project.title} required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                                  <Input
                                    id="technologies"
                                    name="technologies"
                                    defaultValue={project.technologies.join(", ")}
                                    placeholder="React, TypeScript, Node.js"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  name="description"
                                  defaultValue={project.description}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="githubUrl">GitHub URL</Label>
                                  <Input id="githubUrl" name="githubUrl" type="url" defaultValue={project.githubUrl} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="liveUrl">Live URL</Label>
                                  <Input id="liveUrl" name="liveUrl" type="url" defaultValue={project.liveUrl} />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input id="imageUrl" name="imageUrl" type="url" defaultValue={project.imageUrl} />
                              </div>
                              <Button type="submit" className="w-full">
                                Update Project
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this project?")) {
                              saveProjects(projects.filter((p) => p.id !== project.id))
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Education</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingEducation(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingEducation ? "Edit Education" : "Add New Education"}</DialogTitle>
                    <DialogDescription>Fill in the education details below</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEducationSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        name="institution"
                        defaultValue={editingEducation?.institution}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input id="degree" name="degree" defaultValue={editingEducation?.degree} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="field">Field of Study</Label>
                        <Input id="field" name="field" defaultValue={editingEducation?.field} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startYear">Start Year</Label>
                        <Input id="startYear" name="startYear" defaultValue={editingEducation?.startYear} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endYear">End Year</Label>
                        <Input id="endYear" name="endYear" defaultValue={editingEducation?.endYear} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea id="description" name="description" defaultValue={editingEducation?.description} />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingEducation ? "Update Education" : "Add Education"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {education.map((edu) => (
                <Card key={edu.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {edu.degree} in {edu.field}
                        </CardTitle>
                        <CardDescription>
                          {edu.institution} • {edu.startYear} - {edu.endYear}
                        </CardDescription>
                        {edu.description && <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingEducation(edu)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Education</DialogTitle>
                              <DialogDescription>Update the education details below</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleEducationSubmit} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="institution">Institution</Label>
                                <Input id="institution" name="institution" defaultValue={edu.institution} required />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="degree">Degree</Label>
                                  <Input id="degree" name="degree" defaultValue={edu.degree} required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="field">Field of Study</Label>
                                  <Input id="field" name="field" defaultValue={edu.field} required />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="startYear">Start Year</Label>
                                  <Input id="startYear" name="startYear" defaultValue={edu.startYear} required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="endYear">End Year</Label>
                                  <Input id="endYear" name="endYear" defaultValue={edu.endYear} required />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea id="description" name="description" defaultValue={edu.description} />
                              </div>
                              <Button type="submit" className="w-full">
                                Update Education
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this education entry?")) {
                              saveEducation(education.filter((e) => e.id !== edu.id))
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Contacts</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingContact(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingContact ? "Edit Contact" : "Add New Contact"}</DialogTitle>
                    <DialogDescription>Fill in the contact details below</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select name="type" defaultValue={editingContact?.type} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="github">GitHub</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="label">Label</Label>
                      <Input
                        id="label"
                        name="label"
                        defaultValue={editingContact?.label}
                        placeholder="e.g., Work Email, Personal Phone"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        name="value"
                        defaultValue={editingContact?.value}
                        placeholder="e.g., john@example.com, +1234567890"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">URL (Optional)</Label>
                      <Input
                        id="url"
                        name="url"
                        type="url"
                        defaultValue={editingContact?.url}
                        placeholder="Full URL if applicable"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingContact ? "Update Contact" : "Add Contact"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg capitalize">{contact.type}</CardTitle>
                        <CardDescription>{contact.label}</CardDescription>
                        <p className="text-sm font-mono mt-1">{contact.value}</p>
                        {contact.url && (
                          <a
                            href={contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {contact.url}
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingContact(contact)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Contact</DialogTitle>
                              <DialogDescription>Update the contact details below</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select name="type" defaultValue={contact.type} required>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select contact type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="phone">Phone</SelectItem>
                                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                                    <SelectItem value="github">GitHub</SelectItem>
                                    <SelectItem value="website">Website</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="label">Label</Label>
                                <Input
                                  id="label"
                                  name="label"
                                  defaultValue={contact.label}
                                  placeholder="e.g., Work Email, Personal Phone"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="value">Value</Label>
                                <Input
                                  id="value"
                                  name="value"
                                  defaultValue={contact.value}
                                  placeholder="e.g., john@example.com, +1234567890"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="url">URL (Optional)</Label>
                                <Input
                                  id="url"
                                  name="url"
                                  type="url"
                                  defaultValue={contact.url}
                                  placeholder="Full URL if applicable"
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                Update Contact
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this contact?")) {
                              saveContacts(contacts.filter((c) => c.id !== contact.id))
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingBlogPost(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Blog Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingBlogPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
                    <DialogDescription>Fill in the blog post details below</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleBlogPostSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={editingBlogPost?.title} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          name="author"
                          defaultValue={editingBlogPost?.author || "Raghav Vian Panthi"}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        defaultValue={editingBlogPost?.excerpt}
                        placeholder="Brief description of the blog post"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content (Optional)</Label>
                      <Textarea
                        id="content"
                        name="content"
                        defaultValue={editingBlogPost?.content}
                        placeholder="Full blog post content"
                        rows={6}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="publishedAt">Published Date</Label>
                        <Input
                          id="publishedAt"
                          name="publishedAt"
                          type="date"
                          defaultValue={editingBlogPost?.publishedAt}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          name="tags"
                          defaultValue={editingBlogPost?.tags.join(", ")}
                          placeholder="React, JavaScript, Web Development"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="url">URL (Optional)</Label>
                        <Input
                          id="url"
                          name="url"
                          type="url"
                          defaultValue={editingBlogPost?.url}
                          placeholder="External blog post URL"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          type="url"
                          defaultValue={editingBlogPost?.imageUrl}
                          placeholder="Featured image URL"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingBlogPost ? "Update Blog Post" : "Add Blog Post"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span>By {post.author}</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingBlogPost(post)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Blog Post</DialogTitle>
                              <DialogDescription>Update the blog post details below</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleBlogPostSubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="title">Title</Label>
                                  <Input id="title" name="title" defaultValue={post.title} required />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="author">Author</Label>
                                  <Input id="author" name="author" defaultValue={post.author} required />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                  id="excerpt"
                                  name="excerpt"
                                  defaultValue={post.excerpt}
                                  placeholder="Brief description of the blog post"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="content">Content (Optional)</Label>
                                <Textarea
                                  id="content"
                                  name="content"
                                  defaultValue={post.content}
                                  placeholder="Full blog post content"
                                  rows={6}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="publishedAt">Published Date</Label>
                                  <Input
                                    id="publishedAt"
                                    name="publishedAt"
                                    type="date"
                                    defaultValue={post.publishedAt}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                                  <Input
                                    id="tags"
                                    name="tags"
                                    defaultValue={post.tags.join(", ")}
                                    placeholder="React, JavaScript, Web Development"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="url">URL (Optional)</Label>
                                  <Input
                                    id="url"
                                    name="url"
                                    type="url"
                                    defaultValue={post.url}
                                    placeholder="External blog post URL"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                                  <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    defaultValue={post.imageUrl}
                                    placeholder="Featured image URL"
                                  />
                                </div>
                              </div>
                              <Button type="submit" className="w-full">
                                Update Blog Post
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this blog post?")) {
                              saveBlogPosts(blogPosts.filter((p) => p.id !== post.id))
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {post.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                          View Post
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

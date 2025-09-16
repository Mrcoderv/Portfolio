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
import { Trash2, Edit, Plus, Eye, FileText, Download } from "lucide-react"
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
  const [router, setEditingSocialLink, setEditingContactInfo] = [
    useRouter(),
    useState<SocialLink | null>(null),
    useState<ContactInfo | null>(null),
  ]
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [cvInfo, setCvInfo] = useState<CVInfo | null>(null)
  const [uploadingCV, setUploadingCV] = useState(false)
  const editingSocialLink = null
  const editingContactInfo = null

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio-projects")
    const savedEducation = localStorage.getItem("portfolio-education")
    const savedContacts = localStorage.getItem("portfolio-contacts")
    const savedBlogPosts = localStorage.getItem("portfolio-blog-posts")
    const savedSocialLinks = localStorage.getItem("portfolio-social-links")
    const savedContactInfo = localStorage.getItem("portfolio-contact-info")

    if (savedProjects) setProjects(JSON.parse(savedProjects))
    if (savedEducation) setEducation(JSON.parse(savedEducation))
    if (savedContacts) setContacts(JSON.parse(savedContacts))
    if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts))
    if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks))
    if (savedContactInfo) setContactInfo(JSON.parse(savedContactInfo))

    const authStatus = sessionStorage.getItem("admin-authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = () => {
    const savedProjects = localStorage.getItem("portfolio-projects")
    const savedEducation = localStorage.getItem("portfolio-education")
    const savedContacts = localStorage.getItem("portfolio-contacts")
    const savedBlogPosts = localStorage.getItem("portfolio-blog-posts")
    const savedSocialLinks = localStorage.getItem("portfolio-social-links")
    const savedContactInfo = localStorage.getItem("portfolio-contact-info")

    if (savedProjects) setProjects(JSON.parse(savedProjects))
    if (savedEducation) setEducation(JSON.parse(savedEducation))
    if (savedContacts) setContacts(JSON.parse(savedContacts))
    if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts))
    if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks))
    if (savedContactInfo) setContactInfo(JSON.parse(savedContactInfo))

    const savedCV = localStorage.getItem("portfolio-cv")
    if (savedCV) {
      setCvInfo(JSON.parse(savedCV))
    }
  }

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

  const saveSocialLinks = (newSocialLinks: SocialLink[]) => {
    setSocialLinks(newSocialLinks)
    localStorage.setItem("portfolio-social-links", JSON.stringify(newSocialLinks))
  }

  const saveContactInfo = (newContactInfo: ContactInfo[]) => {
    setContactInfo(newContactInfo)
    localStorage.setItem("portfolio-contact-info", JSON.stringify(newContactInfo))
  }

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file")
      return
    }

    setUploadingCV(true)

    try {
      // Create CV info object
      const newCVInfo: CVInfo = {
        id: Date.now().toString(),
        filename: file.name,
        uploadDate: new Date().toISOString(),
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        description: "Latest Resume/CV",
      }

      // Save to localStorage (in production, you'd upload to Vercel Blob or similar)
      localStorage.setItem("portfolio-cv", JSON.stringify(newCVInfo))
      setCvInfo(newCVInfo)

      // Note: In production, you would upload the actual file to Vercel Blob here
      console.log("[v0] CV uploaded successfully:", newCVInfo)
    } catch (error) {
      console.error("[v0] Error uploading CV:", error)
      alert("Error uploading CV. Please try again.")
    } finally {
      setUploadingCV(false)
    }
  }

  const handleDeleteCV = () => {
    if (confirm("Are you sure you want to delete the current CV?")) {
      localStorage.removeItem("portfolio-cv")
      setCvInfo(null)
    }
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

  const handleSocialLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const socialLinkData: SocialLink = {
      id: editingSocialLink?.id || Date.now().toString(),
      platform: formData.get("platform") as string,
      username: formData.get("username") as string,
      url: formData.get("url") as string,
      icon: formData.get("icon") as string,
    }

    if (editingSocialLink) {
      saveSocialLinks(socialLinks.map((s) => (s.id === editingSocialLink.id ? socialLinkData : s)))
    } else {
      saveSocialLinks([...socialLinks, socialLinkData])
    }

    setEditingSocialLink(null)
  }

  const handleContactInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const contactInfoData: ContactInfo = {
      id: editingContactInfo?.id || Date.now().toString(),
      type: formData.get("type") as ContactInfo["type"],
      label: formData.get("label") as string,
      value: formData.get("value") as string,
      icon: formData.get("icon") as string,
    }

    if (editingContactInfo) {
      saveContactInfo(contactInfo.map((c) => (c.id === editingContactInfo.id ? contactInfoData : c)))
    } else {
      saveContactInfo([...contactInfo, contactInfoData])
    }

    setEditingContactInfo(null)
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
            <TabsTrigger value="contact-info">Contact Info</TabsTrigger>
            <TabsTrigger value="cv">CV/Resume</TabsTrigger>
          </TabsList>

          {/* ... existing tabs ... */}

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

          <TabsContent value="social" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Social Links</h2>
              <Button onClick={() => setEditingSocialLink({} as SocialLink)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Social Link
              </Button>
            </div>

            {editingSocialLink && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingSocialLink.id ? "Edit Social Link" : "Add New Social Link"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSocialLinkSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Input
                          id="platform"
                          name="platform"
                          defaultValue={editingSocialLink.platform}
                          placeholder="e.g., GitHub, LinkedIn, Twitter"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          defaultValue={editingSocialLink.username}
                          placeholder="Your username"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        name="url"
                        type="url"
                        defaultValue={editingSocialLink.url}
                        placeholder="https://..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon (Lucide icon name)</Label>
                      <Input
                        id="icon"
                        name="icon"
                        defaultValue={editingSocialLink.icon}
                        placeholder="e.g., Github, Linkedin, Twitter"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Save</Button>
                      <Button type="button" variant="outline" onClick={() => setEditingSocialLink(null)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {socialLinks.map((link) => (
                <Card key={link.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{link.platform}</h3>
                        <p className="text-sm text-muted-foreground">@{link.username}</p>
                        <p className="text-sm text-blue-600">{link.url}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingSocialLink(link)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => saveSocialLinks(socialLinks.filter((s) => s.id !== link.id))}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact-info" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <Button onClick={() => setEditingContactInfo({} as ContactInfo)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact Info
              </Button>
            </div>

            {editingContactInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingContactInfo.id ? "Edit Contact Info" : "Add New Contact Info"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactInfoSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <select
                          id="type"
                          name="type"
                          defaultValue={editingContactInfo.type}
                          className="w-full p-2 border rounded-md"
                          required
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="location">Location</option>
                          <option value="website">Website</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="label">Label</Label>
                        <Input
                          id="label"
                          name="label"
                          defaultValue={editingContactInfo.label}
                          placeholder="e.g., Email, WhatsApp, Location"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        name="value"
                        defaultValue={editingContactInfo.value}
                        placeholder="Contact value"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon (Lucide icon name)</Label>
                      <Input
                        id="icon"
                        name="icon"
                        defaultValue={editingContactInfo.icon}
                        placeholder="e.g., Mail, Phone, MapPin"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">Save</Button>
                      <Button type="button" variant="outline" onClick={() => setEditingContactInfo(null)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {contactInfo.map((info) => (
                <Card key={info.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{info.label}</h3>
                        <p className="text-sm text-muted-foreground">{info.type}</p>
                        <p className="text-sm">{info.value}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingContactInfo(info)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => saveContactInfo(contactInfo.filter((c) => c.id !== info.id))}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cv" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage CV/Resume</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current CV/Resume</CardTitle>
                <CardDescription>Upload and manage your CV/Resume file. Only PDF files are supported.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cvInfo ? (
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{cvInfo.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {new Date(cvInfo.uploadDate).toLocaleDateString()}
                          </p>
                          {cvInfo.fileSize && <p className="text-sm text-muted-foreground">Size: {cvInfo.fileSize}</p>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleDeleteCV}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    {cvInfo.description && <p className="text-sm text-muted-foreground">{cvInfo.description}</p>}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No CV/Resume uploaded yet</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cv-upload" className="block text-sm font-medium mb-2">
                      Upload New CV/Resume
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleCVUpload}
                        disabled={uploadingCV}
                        className="flex-1 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {uploadingCV && (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span className="text-sm text-muted-foreground">Uploading...</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Only PDF files are supported. Maximum file size: 10MB
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Production Setup Note:</h4>
                    <p className="text-sm text-blue-800">
                      For production deployment, integrate with Vercel Blob storage to handle actual file uploads.
                      Currently, only metadata is stored locally for demonstration purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

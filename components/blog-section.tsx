"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, User } from "lucide-react"

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
  source: "bytespacenepal" | "manual"
}

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlogPosts()
  }, [])

  const loadBlogPosts = async () => {
    try {
      // Load manual posts from localStorage
      const manualPosts = localStorage.getItem("portfolio-blog-posts")
      const parsedManualPosts: BlogPost[] = manualPosts ? JSON.parse(manualPosts) : []

      const byteSpacePosts: BlogPost[] = [
        {
          id: "bsn-1",
          title: "Clear your Doubts on Serialization and Deserialization in Spring Boot",
          excerpt:
            "Insights on how to develop a clear idea on serialization and deserialization concepts in Spring Boot applications.",
          author: "Raghava Panthi",
          publishedAt: "2024-01-15",
          tags: ["Spring Boot", "Java", "Serialization"],
          url: "https://bytespacenepal.com/serialization-spring-boot",
          imageUrl: "/spring-boot-serialization-tutorial.jpg",
          source: "bytespacenepal",
        },
        {
          id: "bsn-2",
          title: "Master your Lettuce Redis Integration",
          excerpt:
            "Learn how to integrate Redis with Spring Boot using Lettuce client for better performance and scalability.",
          author: "Raghava Panthi",
          publishedAt: "2024-01-10",
          tags: ["Redis", "Spring Boot", "Database"],
          url: "https://bytespacenepal.com/lettuce-redis-integration",
          imageUrl: "/redis-integration-with-spring-boot.jpg",
          source: "bytespacenepal",
        },
        {
          id: "bsn-3",
          title: "Protect Your System From Cross-Site Scripting",
          excerpt:
            "Essential security practices to prevent XSS attacks and protect your web applications from malicious scripts.",
          author: "Raghava Panthi",
          publishedAt: "2024-01-05",
          tags: ["Security", "XSS", "Web Development"],
          url: "https://bytespacenepal.com/prevent-xss-attacks",
          imageUrl: "/xss-security-protection-web-development.jpg",
          source: "bytespacenepal",
        },
      ]

      const filteredByteSpacePosts = byteSpacePosts.filter(
        (post) => post.source === "bytespacenepal" && post.author === "Raghava Panthi",
      )

      // Combine manual posts with filtered Byte Space posts and sort by date
      const allPosts = [...parsedManualPosts, ...filteredByteSpacePosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )

      setPosts(allPosts)
    } catch (error) {
      console.error("Error loading blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
  //     <section id="blog" className="py-20 bg-muted/30">
  //       <div className="container mx-auto px-4">
  //         <div className="text-center mb-16">
  //           <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest Blog Posts</h2>
  //           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  //             Insights and articles from Byte Space Nepal and personal thoughts on technology
  //           </p>
  //         </div>
  //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {[1, 2, 3].map((i) => (
  //             <Card key={i} className="animate-pulse">
  //               <div className="h-48 bg-muted rounded-t-lg"></div>
  //               <CardHeader>
  //                 <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
  //                 <div className="h-3 bg-muted rounded w-1/2"></div>
  //               </CardHeader>
  //               <CardContent>
  //                 <div className="space-y-2">
  //                   <div className="h-3 bg-muted rounded"></div>
  //                   <div className="h-3 bg-muted rounded w-5/6"></div>
  //                 </div>
  //               </CardContent>
  //             </Card>
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //   )
  // }

  // return (
  //   <section id="blog" className="py-20 bg-muted/30">
  //     <div className="container mx-auto px-4">
  //       <div className="text-center mb-16 animate-fade-in-up">
  //         <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest Blog Posts</h2>
  //         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  //           Articles by Raghava Panthi from Byte Space Nepal and personal thoughts on technology
  //         </p>
  //       </div>

  //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  //         {posts.slice(0, 6).map((post, index) => (
  //           <Card
  //             key={post.id}
  //             className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up overflow-hidden"
  //             style={{ animationDelay: `${index * 0.1}s` }}
  //           >
  //             {post.imageUrl && (
  //               <div className="relative h-48 overflow-hidden">
  //                 <img
  //                   src={post.imageUrl || "/placeholder.svg"}
  //                   alt={post.title}
  //                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  //                 />
  //                 {post.source === "bytespacenepal" && (
  //                   <Badge className="absolute top-2 right-2 bg-secondary">Byte Space Nepal</Badge>
  //                 )}
  //               </div>
  //             )}

  //             <CardHeader>
  //               <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
  //                 {post.title}
  //               </CardTitle>
  //               <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
  //             </CardHeader>

  //             <CardContent className="space-y-4">
  //               <div className="flex items-center gap-4 text-sm text-muted-foreground">
  //                 <div className="flex items-center gap-1">
  //                   <User className="w-4 h-4" />
  //                   {post.author}
  //                 </div>
  //                 <div className="flex items-center gap-1">
  //                   <Calendar className="w-4 h-4" />
  //                   {formatDate(post.publishedAt)}
  //                 </div>
  //               </div>

  //               <div className="flex flex-wrap gap-2">
  //                 {post.tags.slice(0, 3).map((tag) => (
  //                   <Badge key={tag} variant="outline" className="text-xs">
  //                     {tag}
  //                   </Badge>
  //                 ))}
  //               </div>

  //               {post.url && (
  //                 <Button
  //                   variant="outline"
  //                   size="sm"
  //                   className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
  //                   asChild
  //                 >
  //                   <a href={post.url} target="_blank" rel="noopener noreferrer">
  //                     Read More
  //                     <ExternalLink className="w-4 h-4 ml-2" />
  //                   </a>
  //                 </Button>
  //               )}
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>

  //       {posts.length > 6 && (
  //         <div className="text-center mt-12">
  //           <Button variant="outline" size="lg">
  //             View All Posts
  //           </Button>
  //         </div>
  //       )}

  //       {posts.length === 0 && (
  //         <div className="text-center py-12">
  //           <p className="text-muted-foreground">No blog posts available at the moment.</p>
  //         </div>
  //       )}
  //     </div>
  //   </section>
      <iframe
      src="https://bytespacenepal.com/author/raghavapanthi/"
      className="w-full h-[600px] rounded-xl border"
      title="Embedded Blog"
    ></iframe>
      
  )
}

"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"

interface Post {
  post_no: number
  post_type: string
  title: string
  author: string
  content: string
  summary?: string
  tags?: string[]
  category?: string
  language?: string
  status: string
  created_at: string
}

const POEM_POST_TYPE = "poem"
const POEM_CONTENT_CLASS =
  "rounded-xl border border-primary/30 bg-gradient-to-r from-rose-100/70 via-orange-100/70 to-violet-100/70 dark:from-rose-500/10 dark:via-orange-500/10 dark:to-violet-500/10 text-fuchsia-700 dark:text-fuchsia-300 font-bold text-base md:text-lg leading-loose p-3"

export default function HiddenAaghPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/hidden/aagh.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch aagh.json: ${res.status}`)
        }
        return res.json()
      })
      .then((data: { posts: Post[] }) => {
        setPosts(data.posts || [])
      })
      .catch((err) => {
        console.error("Failed to load aagh.json:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Aagh — <span className="text-primary">Articles &amp; Poems</span>
          </h1>
          <p className="text-muted-foreground">
            A quiet corner for thoughts, stories, and verse.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            No posts yet.
          </p>
        )}

        <div className="space-y-8">
          {posts.map((post) => {
            const isPoem = post.post_type.toLowerCase() === POEM_POST_TYPE

            return (
              <article
                key={post.post_no}
                className={`rounded-2xl p-6 shadow-sm border ${
                  isPoem
                    ? "bg-gradient-to-br from-primary/10 via-card to-pink-500/10 border-primary/30"
                    : "bg-card border-border"
                }`}
              >
                <header className="mb-4">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {post.post_type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By {post.author} &bull;{" "}
                    {new Date(post.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </header>

                {post.summary && (
                  <p className="text-sm text-muted-foreground italic mb-4 border-l-2 border-border pl-3">
                    {post.summary}
                  </p>
                )}

                <pre
                  className={`whitespace-pre-wrap font-sans mb-4 ${
                    isPoem ? POEM_CONTENT_CLASS : "text-sm leading-relaxed text-foreground"
                  }`}
                >
                  {post.content}
                </pre>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}

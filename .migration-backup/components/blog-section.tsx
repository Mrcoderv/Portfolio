"use client"

export function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Latest Blog <span className="text-primary">Posts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles and insights from Raghav Panthi on technology, data science, and web development
          </p>
        </div>

        <div className="w-full rounded-lg border border-border shadow-lg animate-fade-in-up p-8 text-center bg-card">
          <p className="text-muted-foreground mb-4">
            Medium blocks embedded views in some browsers. Open the blog directly instead.
          </p>
          <a
            href="https://medium.com/@raghavp791"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Open latest posts in a new tab
          </a>
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          <a
            href="https://medium.com/@raghavp791"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View all articles on medium →
          </a>
        </p>
      </div>
    </section>
  )
}

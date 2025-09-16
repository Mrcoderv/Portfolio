import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export default function SEOHead({
  title = "Raghav Vian Panthi - Full Stack Developer",
  description = "Computer Applications student and full-stack developer from Nepal specializing in modern web development.",
  canonical = "https://raghavpanthi.com.np",
  ogImage = "/professional-headshot-of-a-young-developer-with-gl.jpg",
}: SEOHeadProps) {
  return (
    <Head>
      <link rel="canonical" href={canonical} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1e40af" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Additional meta tags for better SEO */}
      <meta name="author" content="Raghav Vian Panthi" />
      <meta name="copyright" content="Raghav Vian Panthi" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />

      {/* Geo tags for Nepal */}
      <meta name="geo.region" content="NP" />
      <meta name="geo.country" content="Nepal" />

      {/* Additional Open Graph tags */}
      <meta property="og:site_name" content="Raghav Panthi Portfolio" />
      <meta property="og:locale" content="en_US" />
      <meta property="article:author" content="Raghav Vian Panthi" />

      {/* Twitter Card tags */}
      <meta name="twitter:site" content="@raghavpanthi" />
      <meta name="twitter:creator" content="@raghavpanthi" />
    </Head>
  )
}

import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raghav Vian Panthi - AI & Machine Learning Developer Portfolio",
    short_name: "Raghav Panthi",
    description:
      "Developer from Nepal focused on AI, machine learning, and data-driven applications. Explore projects, fintech solutions, and modern web development work.",

    start_url: "/",
    display: "standalone",

    background_color: "#0f172a",
    theme_color: "#1e40af",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

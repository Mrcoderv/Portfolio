import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raghav Vian Panthi - Full Stack Developer Portfolio",
    short_name: "Raghav Panthi",
    description:
      "Computer Applications student and full-stack developer from Nepal specializing in modern web development.",
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
    ],
  }
}

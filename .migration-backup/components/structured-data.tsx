export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raghav Vian Panthi",
    alternateName: "Raghav Panthi",
    description:
      "Computer Applications student and full-stack developer from Nepal specializing in Java, Python, JavaScript, React, and modern web development.",
    url: "https://raghavpanthi.com.np",
    image: "https://raghavpanthi.com.np/professional-headshot-of-a-young-developer-with-gl.jpg",
    sameAs: ["https://github.com/raghavpanthi", "https://linkedin.com/in/raghavpanthi"],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Computer Applications Program",
    },
    knowsAbout: [
      "Java Programming",
      "Python Development",
      "JavaScript",
      "React.js",
      "Next.js",
      "Web Development",
      "Full Stack Development",
      "Software Engineering",
    ],
    nationality: {
      "@type": "Country",
      name: "Nepal",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

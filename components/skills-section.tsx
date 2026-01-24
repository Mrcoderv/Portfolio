import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Code, Database, Globe, BarChart3 } from "lucide-react"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 80 },
        { name: "Java", level: 85 },
        { name: "C", level: 75 },
        { name: ".NET", level: 70 },
      ],
    },
    {
      title: "ML / Data Science",
      icon: BarChart3,
      skills: [
        { name: "Pandas", level: 75 },
        { name: "NumPy", level: 75 },
        { name: "Matplotlib", level: 70 },
        { name: "Scikit-learn", level: 70 },
      ],
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "WordPress", level: 75 },
      ],
    },
    {
      title: "Database & Tools",
      icon: Database,
      skills: [
        { name: "SQL", level: 75 },
        { name: "Git/GitHub", level: 85 },
        { name: "VS Code", level: 90 },
        { name: "Streamlit", level: 70 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels across various technologies and
            tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

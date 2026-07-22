import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { EducationSection } from '@/components/education-section';
import { ProjectsSection } from '@/components/projects-section';
import { BlogSection } from '@/components/blog-section';
import { CertificatesSection } from '@/components/certificates-section';
import { ContactSection } from '@/components/contact-section';
import StructuredData from '@/components/structured-data';
import HiddenAaghPage from '@/pages/hidden-aagh';
import NotFound from '@/pages/not-found';
import projectsData from '@/data/projects.json';

const queryClient = new QueryClient();

function HomePage() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection initialProjects={projectsData} />
        <BlogSection />
        <CertificatesSection />
        <ContactSection />
      </main>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/hidden_aagh" component={HiddenAaghPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

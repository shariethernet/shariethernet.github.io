"use client"

import { useEffect, useState } from "react"
import { Link as ScrollLink } from "react-scroll"
import { AlertCircle, ChevronUp } from "lucide-react"
import Header from "@/components/header"
import Home from "@/components/home"
import Profile from "@/components/profile"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { loadJsonWithErrorHandling } from "@/utils/json-loader"

export default function Portfolio() {
  const [data, setData] = useState({
    home: null,
    profile: null,
    education: null,
    experience: null,
    projects: null,
    contact: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeData, profileData, educationData, experienceData, projectsData, contactData] = await Promise.all([
          loadJsonWithErrorHandling("/data/home.json"),
          loadJsonWithErrorHandling("/data/profile.json"),
          loadJsonWithErrorHandling("/data/education.json"),
          loadJsonWithErrorHandling("/data/experience.json"),
          loadJsonWithErrorHandling("/data/projects.json"),
          loadJsonWithErrorHandling("/data/contact.json"),
        ])

        setData({
          home: homeData,
          profile: profileData,
          education: educationData,
          experience: experienceData,
          projects: projectsData,
          contact: contactData,
        })
        setLoading(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-primary/15" />
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
        <div className="glass-strong rounded-2xl p-8 max-w-2xl w-full">
          <div className="flex items-center text-destructive mb-4">
            <AlertCircle className="h-7 w-7 mr-2" />
            <h2 className="text-2xl font-bold font-display">Error Loading Data</h2>
          </div>
          <p className="text-muted-foreground mb-4">There was a problem loading the portfolio data:</p>
          <div className="bg-destructive/10 p-4 rounded-xl overflow-auto border border-destructive/20">
            <pre className="text-destructive whitespace-pre-wrap text-sm">{error}</pre>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Please check your JSON data files in <code className="font-mono text-primary">public/data/</code> for syntax
            errors and ensure they are properly formatted.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      {/* ---- Decorative background layers ---- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* blueprint grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.35]" />
        {/* aurora glows */}
        <div
          className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full blur-[130px] opacity-[0.28] animate-float"
          style={{ background: "radial-gradient(circle, hsl(var(--glow-1) / 0.5), transparent 65%)" }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full blur-[130px] opacity-[0.2] animate-float-slow"
          style={{ background: "radial-gradient(circle, hsl(var(--glow-2) / 0.45), transparent 65%)" }}
        />
        {/* vignette to keep edges grounded */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, transparent 40%, hsl(var(--background)) 100%)" }}
        />
      </div>

      <Header />

      <main>
        <section id="home" className="relative">
          <Home data={data.home} />
        </section>

        <section id="profile" className="py-24 md:py-32">
          <Profile data={data.profile} />
        </section>

        <section id="education" className="py-24 md:py-32">
          <Education data={data.education} />
        </section>

        <section id="experience" className="py-24 md:py-32">
          <Experience data={data.experience} />
        </section>

        <section id="projects" className="py-24 md:py-32">
          <Projects data={data.projects} />
        </section>

        <section id="contact" className="py-24 md:py-32">
          <Contact data={data.contact} />
        </section>
      </main>

      <Footer resumeUrl={data.home?.resumeUrl || "/resume.pdf"} />

      {/* Scroll to top */}
      <div className="fixed bottom-8 right-8 z-40">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="glass flex items-center justify-center w-12 h-12 rounded-full text-primary hover:text-primary hover:border-primary/50 transition-colors cursor-pointer shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </ScrollLink>
      </div>

      <Toaster />
    </div>
  )
}

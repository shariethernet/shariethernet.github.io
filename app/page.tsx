"use client"

import { useEffect, useState } from "react"
import { Link as ScrollLink } from "react-scroll"
import Header from "@/components/header"
import Home from "@/components/home"
import Profile from "@/components/profile"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AlertCircle } from "lucide-react"
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="flex items-center text-red-500 mb-4">
          <AlertCircle className="h-8 w-8 mr-2" />
          <h2 className="text-2xl font-bold">Error Loading Data</h2>
        </div>
        <p className="text-center mb-4">There was a problem loading the portfolio data:</p>
        <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-md max-w-2xl w-full overflow-auto">
          <pre className="text-red-700 dark:text-red-300 whitespace-pre-wrap">{error}</pre>
        </div>
        <p className="mt-4 text-center">
          Please check your JSON data files for syntax errors and ensure they are properly formatted.
        </p>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <main>
          <section id="home" className="min-h-screen">
            <Home data={data.home} />
          </section>

          <section id="profile" className="min-h-screen py-20">
            <Profile data={data.profile} />
          </section>

          <section id="education" className="min-h-screen py-20 bg-muted/30">
            <Education data={data.education} />
          </section>

          <section id="experience" className="min-h-screen py-20">
            <Experience data={data.experience} />
          </section>

          <section id="projects" className="min-h-screen py-20 bg-muted/30">
            <Projects data={data.projects} />
          </section>

          <section id="contact" className="min-h-screen py-20">
            <Contact data={data.contact} />
          </section>
        </main>

        <Footer resumeUrl={data.home?.resumeUrl || "/resume.pdf"} />

        <div className="fixed bottom-10 right-10">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </ScrollLink>
        </div>
      </div>
    </ThemeProvider>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, ArrowUpRight, Cpu } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import SectionHeading from "./section-heading"

function hasRealImage(src) {
  return src && !src.includes("placeholder")
}

function ProjectVisual({ project, className = "" }) {
  if (hasRealImage(project.image)) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={`object-cover ${className}`}
      />
    )
  }
  // Stylized "silicon die" banner
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 0% 0%, hsl(var(--glow-1) / 0.35), transparent 50%), radial-gradient(120% 120% at 100% 100%, hsl(var(--glow-2) / 0.30), transparent 50%), hsl(var(--card))",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--grid-line) / 0.6) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--grid-line) / 0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <Cpu className="relative h-12 w-12 text-primary/80" strokeWidth={1.2} />
    </div>
  )
}

export default function Projects({ data }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState("all")

  if (!data) return null

  const filteredProjects =
    filter === "all" ? data.projects : data.projects.filter((project) => project.category === filter)

  const categories = ["all", ...new Set(data.projects.map((project) => project.category))]

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <SectionHeading eyebrow="// 04 — Selected work" title="Projects" />

      {categories.length > 1 && (
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === category ? "text-black" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter === category && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {category}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setSelectedProject(project)}
                className="glass-card flex h-full w-full flex-col overflow-hidden rounded-2xl text-left"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <ProjectVisual project={project} />
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="flex items-start justify-between gap-2 font-display text-lg font-bold">
                    {project.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 translate-y-1 text-muted-foreground transition-all group-hover:text-primary" />
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="rounded-md px-2 py-0.5 font-mono text-[11px] text-primary">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="glass-strong max-h-[88vh] max-w-3xl overflow-y-auto border-border/60 bg-background/80 p-0 sm:rounded-3xl">
            <div className="relative h-56 w-full overflow-hidden sm:rounded-t-3xl">
              <ProjectVisual project={selectedProject} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>

            <div className="px-6 pb-7 sm:px-8">
              <DialogHeader className="text-left">
                <span className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 font-mono text-xs capitalize text-primary">
                  {selectedProject.category}
                </span>
                <DialogTitle className="font-display text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>

              <p className="mt-3 leading-relaxed text-muted-foreground">{selectedProject.description}</p>

              {selectedProject.features && (
                <div className="mt-6">
                  <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-foreground/70">Key Highlights</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span className="text-foreground/85">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-foreground/70">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="chip text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(selectedProject.github || selectedProject.liveDemo) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  )}
                  {selectedProject.liveDemo && (
                    <a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

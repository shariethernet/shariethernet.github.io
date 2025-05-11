"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Projects({ data }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState("all")

  if (!data) return null

  const filteredProjects =
    filter === "all" ? data.projects : data.projects.filter((project) => project.category === filter)

  const categories = ["all", ...new Set(data.projects.map((project) => project.category))]

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
        <div className="h-1 w-20 bg-primary mx-auto"></div>
      </motion.div>

      {categories.length > 1 && (
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col project-card overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={project.image || "/placeholder.svg?height=200&width=400"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-grow p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-muted px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center"
                >
                  Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <div className="flex gap-2">
                  {project.github && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  )}
                  {project.liveDemo && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                {selectedProject.category && (
                  <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs capitalize">
                    {selectedProject.category}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-64 w-full mb-4">
              <Image
                src={selectedProject.image || "/placeholder.svg?height=300&width=600"}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="space-y-4">
              <p>{selectedProject.description}</p>

              {selectedProject.features && (
                <div>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {selectedProject.github && (
                  <Button asChild>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {selectedProject.liveDemo && (
                  <Button variant="outline" asChild>
                    <a
                      href={selectedProject.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

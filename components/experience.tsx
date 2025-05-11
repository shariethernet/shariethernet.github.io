"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

export default function Experience({ data }) {
  if (!data) return null

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
        <div className="h-1 w-20 bg-primary mx-auto"></div>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {data.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="timeline-item"
          >
            <div className="bg-card rounded-lg shadow-sm p-6 border">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <h4 className="text-primary font-medium">{exp.company}</h4>
                </div>
                <div className="flex flex-col items-start md:items-end text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.period}
                  </div>
                  {exp.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {exp.location}
                    </div>
                  )}
                </div>
              </div>

              {exp.description && <p className="text-muted-foreground mb-4">{exp.description}</p>}

              <ul className="space-y-2">
                {exp.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-medium mb-2">Technologies:</h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

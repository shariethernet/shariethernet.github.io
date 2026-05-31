"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Briefcase } from "lucide-react"
import SectionHeading from "./section-heading"

export default function Experience({ data }) {
  if (!data) return null

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <SectionHeading eyebrow="// 03 — Where I've worked" title="Experience" />

      <div className="relative">
        {data.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="timeline-item"
          >
            <div className="glass-card rounded-2xl p-6 md:p-7">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug">{exp.position}</h3>
                    <h4 className="font-medium text-primary">{exp.company}</h4>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-1.5 md:items-end">
                  <span className="flex items-center gap-1.5 rounded-full bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {exp.description && <p className="mb-4 text-sm text-muted-foreground">{exp.description}</p>}

              <ul className="space-y-2.5">
                {exp.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="chip text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

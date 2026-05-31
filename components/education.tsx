"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react"
import SectionHeading from "./section-heading"

export default function Education({ data }) {
  if (!data) return null

  return (
    <div className="container mx-auto max-w-3xl px-4">
      <SectionHeading eyebrow="// 02 — Academic record" title="Education" />

      <div className="relative">
        {data.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="timeline-item"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug">{edu.degree}</h3>
                    <h4 className="font-medium text-primary">{edu.institution}</h4>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {edu.period}
                </div>
              </div>

              {edu.location && (
                <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {edu.location}
                </div>
              )}

              {edu.description && <p className="mb-4 text-sm text-muted-foreground">{edu.description}</p>}

              {edu.courses && edu.courses.length > 0 && (
                <div className="mb-4">
                  <h5 className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/70">
                    Relevant Coursework
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, idx) => (
                      <span key={idx} className="chip text-xs">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.achievements && edu.achievements.length > 0 && (
                <div>
                  <h5 className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/70">Achievements</h5>
                  <ul className="space-y-1.5">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="h-4 w-4 shrink-0 text-primary" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

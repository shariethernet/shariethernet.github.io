"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import SectionHeading from "./section-heading"

export default function Profile({ data }) {
  if (!data) return null

  return (
    <div className="container mx-auto max-w-5xl px-4">
      <SectionHeading eyebrow="// 01 — Who I am" title="About Me" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] md:items-start">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-[300px] md:sticky md:top-28"
        >
          <div className="glass-card group relative overflow-hidden rounded-3xl p-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem]">
              <Image
                src={data.profileImage || "/placeholder.svg?height=320&width=320"}
                alt={data.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="font-display text-xl font-bold">{data.name}</h3>
            <p className="mt-1 font-mono text-sm text-primary">{data.title}</p>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-7 md:p-9"
        >
          <div className="space-y-4">
            {data.bio.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <h3 className="mb-8 text-center font-display text-2xl font-semibold tracking-tight">Core Skills</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <h4 className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

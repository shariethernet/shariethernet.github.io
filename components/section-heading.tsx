"use client"

import { motion } from "framer-motion"

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="mb-16 text-center"
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  )
}

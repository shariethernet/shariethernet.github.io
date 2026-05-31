"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react"
import SectionHeading from "./section-heading"

export default function Contact({ data }) {
  if (!data) return null

  const iconFor = (platform) =>
    platform === "linkedin" ? <Linkedin className="h-5 w-5" /> : platform === "github" ? <Github className="h-5 w-5" /> : <Mail className="h-5 w-5" />

  return (
    <div className="container mx-auto max-w-5xl px-4">
      <SectionHeading eyebrow="// 05 — Say hello" title="Get In Touch" />

      <div className="flex justify-center">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="glass-card flex w-full max-w-xl flex-col rounded-3xl p-7 md:p-9"
        >
          <h3 className="font-display text-xl font-bold">Connect with me</h3>
          {data.contactText && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{data.contactText}</p>
          )}

          <div className="mt-7 space-y-3">
            <a
              href={`mailto:${data.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-border/60 p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">Email</span>
                <span className="block truncate font-medium">{data.email}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>

            {data.social.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-border/60 p-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {iconFor(item.platform)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground capitalize">
                    {item.platform}
                  </span>
                  <span className="block truncate font-medium">{item.username}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { Download, Github, Linkedin } from "lucide-react"

export default function Footer({ resumeUrl }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative px-4 pb-10">
      <div className="container mx-auto max-w-5xl">
        <div className="glass-strong overflow-hidden rounded-3xl px-6 py-12 text-center md:px-12">
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Thanks for stopping by.
          </h3>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={resumeUrl}
              download
              className="btn-glow flex items-center gap-2 rounded-full px-7 py-3 font-medium"
            >
              <Download className="h-4 w-4" />
              Download Résumé
            </a>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/shariethernet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/shariethernet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-border/50 pt-7 text-center text-sm text-muted-foreground">
            <p>© {currentYear} Shrihari Gokulachandran</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

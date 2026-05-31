"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { motion } from "framer-motion"
import { ArrowDown, FileDown } from "lucide-react"

export default function Home({ data }) {
  const [typedText, setTypedText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    if (!data?.typingPhrases?.length) return

    const phrases = data.typingPhrases
    const currentPhrase = phrases[currentPhraseIndex]

    const type = () => {
      if (isDeleting) {
        setTypedText((prev) => prev.substring(0, prev.length - 1))
        setTypingSpeed(50)
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + 1))
        setTypingSpeed(110)
      }

      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1800)
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false)
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length)
      }
    }

    const timer = setTimeout(type, typingSpeed)
    return () => clearTimeout(timer)
  }, [typedText, isDeleting, currentPhraseIndex, typingSpeed, data])

  if (!data) return null

  return (
    <div className="container relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground">
          {data.greeting}
        </p>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {data.name}
        </h1>

        <h2 className="mt-7 font-sans text-xl font-normal text-muted-foreground sm:text-2xl">
          {data.titlePrefix}{" "}
          <span className="font-medium text-foreground">{typedText}</span>
          <span className="ml-0.5 inline-block h-[1.05em] w-px translate-y-[0.15em] animate-pulse bg-primary" />
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-balance leading-relaxed text-muted-foreground">
          {data.summary}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="btn-glow flex w-full cursor-pointer items-center justify-center rounded-full px-7 py-3 text-sm font-medium sm:w-auto"
          >
            Get in Touch
          </ScrollLink>

          <a
            href={data.resumeUrl || "/resume.pdf"}
            download
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:w-auto"
          >
            <FileDown className="h-4 w-4" />
            Résumé
          </a>
        </div>
      </motion.div>

      {/* scroll cue */}
      <ScrollLink
        to="profile"
        smooth={true}
        duration={500}
        className="absolute bottom-10 flex cursor-pointer flex-col items-center gap-2 text-muted-foreground/70 transition-colors hover:text-primary"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </ScrollLink>
    </div>
  )
}

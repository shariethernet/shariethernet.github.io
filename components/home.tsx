"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        setTypingSpeed(150)
      }

      if (!isDeleting && typedText === currentPhrase) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 1500)
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
    <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {data.greeting} <span className="text-primary">{data.name}</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-medium mb-6 h-12">
          {data.titlePrefix} <span className="text-primary">{typedText}</span>
          <span className="animate-pulse">|</span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-8">{data.summary}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <ScrollLink to="contact" smooth={true} duration={500}>
              Get in Touch
            </ScrollLink>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <ScrollLink to="profile" smooth={true} duration={500}>
              Learn More
            </ScrollLink>
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-10 animate-bounce">
        <ScrollLink to="profile" smooth={true} duration={500} className="cursor-pointer">
          <ArrowDown className="h-8 w-8 text-primary" />
        </ScrollLink>
      </div>
    </div>
  )
}

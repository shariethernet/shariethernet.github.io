"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "profile", label: "Profile" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
          isScrolled ? "glass-strong shadow-lg" : "border border-transparent"
        }`}
      >
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="group flex cursor-pointer items-center gap-2 pl-1"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 font-display text-sm font-bold text-black shadow-[0_0_18px_-2px_hsl(var(--primary)/0.7)]">
            S
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Shrihari</span>
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              activeClass="!text-primary bg-primary/10"
              className="cursor-pointer rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </ScrollLink>
          ))}
          <div className="mx-1 h-5 w-px bg-border" />
          <ModeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="glass-strong absolute left-4 right-4 top-[72px] rounded-2xl p-3 md:hidden">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <ScrollLink
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  activeClass="!text-primary"
                  className="block cursor-pointer rounded-xl px-4 py-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

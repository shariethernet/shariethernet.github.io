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
      setIsScrolled(window.scrollY > 50)
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <ScrollLink to="home" smooth={true} duration={500} className="text-xl font-bold text-primary cursor-pointer">
          Shrihari
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="text-primary font-medium"
              className="cursor-pointer hover:text-primary transition-colors"
            >
              {item.label}
            </ScrollLink>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="ml-4 p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-md py-4 px-4 shadow-md">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <ScrollLink
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  activeClass="text-primary font-medium"
                  className="block py-2 cursor-pointer hover:text-primary transition-colors"
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

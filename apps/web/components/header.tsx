"use client"

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun, Clock } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    setIsDark(!isDark)
    localStorage.setItem("theme", isDark ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      if (pathname !== "/") {
        window.location.href = `/${href}`
        return
      }
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setIsMenuOpen(false)
    } else if (href === "/products") {
      e.preventDefault()
      if (pathname !== "/") {
        window.location.href = "/products"
      } else {
        const element = document.querySelector("#products")
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
      setIsMenuOpen(false)
    }
  }

  const navLinks = [
    { label: "Products", href: pathname === "/" ? "#products" : "/products" },
    { label: "About", href: pathname === "/" ? "#about" : "/#about" },
    { label: "Contact", href: pathname === "/" ? "#contact" : "/#contact" },
  ]

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "py-3 bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5"
        : "py-5 bg-background/95 backdrop-blur-md border-b border-border/40"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            {/* <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
              <Clock className="w-5 h-5 text-background" />
            </div> */}
            <span className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              Hyderabad Networks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-muted/50 group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button
              size="sm"
              className="rounded-lg bg-foreground text-background hover:bg-foreground/90 px-5 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector("#contact")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2.5 text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/40 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href)
                    setIsMenuOpen(false)
                  }}
                  className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 px-4">
              <Button
                className="w-full rounded-lg bg-foreground text-background hover:bg-foreground/90 font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector("#contact")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  setIsMenuOpen(false)
                }}
              >
                Enquire Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}



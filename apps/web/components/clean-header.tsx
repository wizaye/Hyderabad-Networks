"use client"

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun, ShoppingBag } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function CleanHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

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

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push(`/${href}`)
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    } else {
      router.push(href)
    }
    setIsMenuOpen(false)
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/enquire" },
  ]

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "py-3 bg-background/95 backdrop-blur-sm border-b border-border"
            : "py-4 bg-background border-b border-border/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0"
            >
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-serif text-lg sm:text-xl font-semibold text-foreground tracking-tight hidden sm:block">
                Hyderabad Networks
              </span>
              <span className="font-serif text-base font-semibold text-foreground tracking-tight sm:hidden">
                HN
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.href || (link.href === "/" && pathname === "/")
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Button
                size="sm"
                className="rounded-md bg-accent text-accent-foreground hover:bg-accent/90 px-4 font-medium"
                asChild
              >
                <Link href="/enquire">Enquire Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-4 py-2.5 text-base font-medium rounded-md transition-colors text-left ${
                      pathname === link.href || (link.href === "/" && pathname === "/")
                        ? "text-foreground bg-muted"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="mt-4 px-4">
                <Button
                  className="w-full rounded-md bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                  asChild
                >
                  <Link href="/enquire" onClick={() => setIsMenuOpen(false)}>
                    Enquire Now
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}


import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-background border-t">
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-12 text-sm">
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            Products
          </Link>
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            About Us
          </Link>
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            Blog
          </Link>
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            Wholesale
          </Link>
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            Careers
          </Link>
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            Contact
          </Link>
        </nav>

        {/* Copyright and legal */}
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm text-muted-foreground">© 2025 Hyderabad Networks. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="overflow-hidden text-center">
          <h2 className="text-5xl md:text-7xl lg:text-9xl tracking-tight leading-none font-serif font-light text-accent/20 whitespace-nowrap">
            Hyderabad Networks
          </h2>
        </div>
      </div>
    </footer>
  )
}


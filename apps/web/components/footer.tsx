import Link from "next/link"


export function Footer() {
  return (
    <footer className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-background via-muted/10 to-background border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        {/* Copyright and legal */}
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-center mb-12 sm:mb-16 pb-8 border-b border-border/50">
          <p className="text-xs sm:text-sm text-muted-foreground">© 2025 Hyderabad Networks. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="overflow-hidden text-center py-4">
          <h2 className="text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] tracking-tight leading-[1.1] font-serif font-light text-accent/10 whitespace-nowrap select-none">
            Hyderabad Networks
          </h2>
        </div>
      </div>
    </footer>
  )
}



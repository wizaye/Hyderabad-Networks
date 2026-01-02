import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/background.jpg")',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="text-sm font-medium text-white/90">Authorized Distributor</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white text-balance font-light mb-4">
            Precision Time,
            <br />
            <span className="font-normal">Premium Quality</span>
          </h1>
          
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Hyderabad Networks is the authorized distributor of Ajanta and Orpat clocks. Bringing excellence in time
            management solutions to homes and businesses across India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              className="rounded-md bg-white text-foreground hover:bg-white/95 px-6 py-3 text-sm font-medium"
              asChild
            >
              <a href="#products" className="flex items-center gap-2">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="rounded-md border border-white/40 text-white hover:bg-white/10 px-6 py-3 text-sm font-medium bg-white/5"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white/90">100%</span>
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white/90">5000+</span>
              <span>Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white/90">Pan India</span>
              <span>Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



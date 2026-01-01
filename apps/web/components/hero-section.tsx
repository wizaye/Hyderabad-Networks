import { Button } from "@workspace/ui/components/button"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/luxury-clock-showroom-interior-with-elegant-analog.jpg")',
        }}
      />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="text-sm font-medium text-white/90">Authorized Distributor</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] text-white text-balance font-light tracking-tight">
            Precision Time,
            <br />
            <span className="font-normal">Premium Quality</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-white/90 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
            Hyderabad Networks is the authorized distributor of Ajanta and Orpat clocks. Bringing excellence in time
            management solutions to homes and businesses across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
            <Button
              className="rounded-lg bg-white text-foreground hover:bg-white/95 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              asChild
            >
              <a href="#products">Explore Products</a>
            </Button>
            <Button
              variant="outline"
              className="rounded-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-base font-semibold bg-white/5 backdrop-blur-sm transition-all duration-200"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


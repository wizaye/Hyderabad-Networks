import { Button } from "@workspace/ui/components/button"

export function CtaSection() {
  return (
    <section className="relative py-24 sm:py-28 md:py-36 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-balance font-light leading-tight">
          Ready to Experience
          <br />
          <span className="font-normal">Premium Clocks?</span>
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Browse our collection of authentic Ajanta and Orpat clocks and find the perfect timepiece for your space.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="rounded-lg bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            asChild
          >
            <a href="#products">Shop Now</a>
          </Button>
          <Button
            variant="outline"
            className="rounded-lg px-8 py-6 text-base font-semibold border-2"
            asChild
          >
            <a href="#contact">Contact Sales</a>
          </Button>
        </div>
      </div>
    </section>
  )
}


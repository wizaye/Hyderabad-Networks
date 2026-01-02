import { CleanHeader } from "@/components/clean-header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { LocationMap } from "@/components/location-map"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ProductGlimpse } from "@/components/product-glimpse"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <CleanHeader />
      <HeroSection />
      <HowItWorks />

      <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 font-light leading-tight">
              Trusted Distributor
              <br />
              <span className="font-normal">Since Day One</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              Hyderabad Networks is the authorized distributor of Ajanta and Orpat clocks, bringing excellence in time management solutions to homes and businesses across India. With years of experience and a commitment to quality, we ensure every customer receives authentic products with exceptional service.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 font-light leading-tight">
              Our Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mb-6">
              Explore our wide range of premium clocks designed for every space.
            </p>
          </div>
          <ProductGlimpse />
        </div>
      </section>

      <FaqSection />
      <CtaSection />
      <LocationMap />
      <Footer />
      <ScrollToTop />
    </main>
  )
}

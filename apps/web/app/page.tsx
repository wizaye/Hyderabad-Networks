import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { LocationMap } from "@/components/location-map"
import { ContactEnquiryForm } from "@/components/contact-enquiry-form"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ProductList } from "@/components/product-list"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />


      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 font-light">Our Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of premium clocks designed for every space.
            </p>
          </div>
          <ProductList />
        </div>
      </section>

      <FaqSection />
      <CtaSection />
      <LocationMap />
      <ContactEnquiryForm />
      <Footer />
      <ScrollToTop />
    </main>
  )
}

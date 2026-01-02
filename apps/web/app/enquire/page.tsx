import { CleanHeader } from "@/components/clean-header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { EnhancedEnquiryForm } from "@/components/enhanced-enquiry-form"

export default function EnquirePage() {
  return (
    <main className="min-h-screen bg-background">
      <CleanHeader />
      
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 font-light leading-tight">
              Product Enquiry
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Fill out the form below to enquire about our products. You can add multiple products and specify your requirements.
            </p>
          </div>
          <EnhancedEnquiryForm />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}


import { Suspense } from "react"
import { CleanHeader } from "@/components/clean-header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { EcommerceProductList } from "@/components/ecommerce-product-list"
import { Loader2 } from "lucide-react"

function ProductsListFallback() {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <CleanHeader />
      
      <section id="products" className="pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 via-background to-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3 font-light leading-tight">
              Our Collection
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Explore our wide range of premium clocks designed for every space.
            </p>
          </div>
          <Suspense fallback={<ProductsListFallback />}>
            <EcommerceProductList />
          </Suspense>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}


import { Clock, Store, Truck, RotateCw } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-full mb-4 sm:mb-6">
            Why Choose Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            Trusted Quality,
            <br />
            Professional Service
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
            Delivering authentic Ajanta and Orpat clocks with premium quality and exceptional customer support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="group flex flex-col items-start p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-serif text-xl mb-3 font-semibold">Authentic Products</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              100% genuine Ajanta and Orpat clocks with full manufacturer warranty.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group flex flex-col items-start p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Store className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-serif text-xl mb-3 font-semibold">Wide Selection</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Comprehensive range of analog, digital, and smart clock solutions for every need.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group flex flex-col items-start p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Truck className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-serif text-xl mb-3 font-semibold">Fast Delivery</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Quick and reliable shipping across India with real-time tracking.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group flex flex-col items-start p-6 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <RotateCw className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-serif text-xl mb-3 font-semibold">Easy Returns</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Hassle-free returns and exchanges within 30 days of purchase.
            </p>
          </div>
        </div>


      </div>
    </section>
  )
}


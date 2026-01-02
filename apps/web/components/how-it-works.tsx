import { Clock, Store, Truck, RotateCw } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-tight mb-4">
            Trusted Quality,
            <br />
            <span className="font-normal">Professional Service</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Delivering authentic Ajanta and Orpat clocks with premium quality and exceptional customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-start p-6 border border-border rounded-lg bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Authentic Products</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              100% genuine Ajanta and Orpat clocks with full manufacturer warranty.
            </p>
          </div>

          <div className="flex flex-col items-start p-6 border border-border rounded-lg bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Store className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Comprehensive range of analog, digital, and smart clock solutions for every need.
            </p>
          </div>

          <div className="flex flex-col items-start p-6 border border-border rounded-lg bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Quick and reliable shipping across India with real-time tracking.
            </p>
          </div>

          <div className="flex flex-col items-start p-6 border border-border rounded-lg bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <RotateCw className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Hassle-free returns and exchanges within 30 days of purchase.
            </p>
          </div>
        </div>


      </div>
    </section>
  )
}



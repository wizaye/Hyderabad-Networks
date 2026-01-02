import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-4 font-light leading-tight">
          Ready to Experience
          <br />
          <span className="font-normal">Premium Clocks?</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Browse our collection of authentic Ajanta and Orpat clocks and find the perfect timepiece for your space.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            className="rounded-md bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-sm font-medium"
            asChild
          >
            <a href="/enquire" className="flex items-center gap-2 justify-center">
              Enquire Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-md px-6 py-3 text-sm font-medium"
            asChild
          >
            <a href="/enquire">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  )
}



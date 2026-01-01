"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Are all products authentic Ajanta and Orpat clocks?",
    answer:
      "Yes, every clock sold through Hyderabad Networks is 100% authentic and original. All products come with manufacturer warranty and certification of authenticity.",
  },
  {
    question: "What is the warranty period for clocks?",
    answer:
      "Warranty periods vary by product type. Wall clocks typically come with 1-2 years warranty, while digital and smart clocks may have extended warranties. Check individual product pages for specific details.",
  },
  {
    question: "Do you offer bulk orders for businesses?",
    answer:
      "Yes, we cater to bulk orders for corporate offices, retail stores, and institutions. Special pricing and customization options are available. Please contact our sales team for bulk inquiries.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We offer 30 days hassle-free returns and exchanges. Products must be in original condition with packaging. Return shipping is free for defective items.",
  },
  {
    question: "Do you deliver outside Hyderabad?",
    answer:
      "Yes, we ship across India with reliable courier partners. Delivery typically takes 3-7 business days depending on location. Real-time tracking is provided for all orders.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-light">
              Common Questions
              <br />
              <span className="font-normal">Answered</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base">
              Everything you need to know about our products and services.
            </p>
          </div>
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-t border-border">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between py-5 text-left gap-4 group hover:bg-muted/30 transition-colors rounded-lg px-2 -mx-2"
                >
                  <span className="text-sm font-medium text-foreground pr-2 leading-relaxed">{faq.question}</span>
                  <Plus
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-all duration-200`}
                    style={{ transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)" }}
                  />
                </button>
                {openIndex === index && (
                  <div className="pb-5 pl-2 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </section>
  )
}


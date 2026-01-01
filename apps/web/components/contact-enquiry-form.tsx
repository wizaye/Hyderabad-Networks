"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactEnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-full mb-4 sm:mb-6">
            Contact Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            Get in Touch
            <br />
            With Our Team
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
            Have questions about our products or services? We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="border rounded-xl p-5 sm:p-6 hover:border-accent transition-colors">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 text-foreground">Address</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="border rounded-xl p-5 sm:p-6 hover:border-accent transition-colors">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 text-foreground">Phone</h3>
                  <a href="tel:+919876543210" className="text-sm sm:text-base text-accent hover:underline font-medium">
                    +91 9876 543 210
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="border rounded-xl p-5 sm:p-6 hover:border-accent transition-colors">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 text-foreground">Email</h3>
                  <a
                    href="mailto:info@hyderabadnetworks.com"
                    className="text-sm sm:text-base text-accent hover:underline font-medium"
                  >
                    info@hyderabadnetworks.com
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="border rounded-xl p-5 sm:p-6 hover:border-accent transition-colors">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-3 text-foreground">Business Hours</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-5 border border-border rounded-xl p-6 sm:p-8 bg-card">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2.5 text-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2.5 text-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2.5 text-foreground">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground transition-all"
                placeholder="+91 XXXX XXXX XX"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-2.5 text-foreground">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all cursor-pointer"
              >
                <option value="">Select a subject</option>
                <option value="bulk-order">Bulk Order Enquiry</option>
                <option value="wholesale">Wholesale Inquiry</option>
                <option value="product-info">Product Information</option>
                <option value="support">Customer Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2.5 text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground resize-none transition-all"
                placeholder="Tell us how we can help..."
              />
            </div>

            <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-all">
              Send Message
            </Button>

            {submitted && (
              <div className="p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg text-sm border border-green-200 dark:border-green-800">
                Thank you! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}


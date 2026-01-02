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
    company: "",
    subject: "",
    quantity: "",
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
    setFormData({ name: "", email: "", phone: "", company: "", subject: "", quantity: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-tight mb-4">
            Get in Touch
            <br />
            <span className="font-normal">With Our Team</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about our products or services? We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="border border-border rounded-lg p-5 sm:p-6 bg-card">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 text-foreground font-semibold">Address</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="border border-border rounded-lg p-5 sm:p-6 bg-card">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 text-foreground font-semibold">Phone</h3>
                  <a href="tel:+919876543210" className="text-sm sm:text-base text-accent hover:underline font-medium transition-colors">
                    +91 9876 543 210
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="border border-border rounded-lg p-5 sm:p-6 bg-card">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-2 text-foreground font-semibold">Email</h3>
                  <a
                    href="mailto:info@hyderabadnetworks.com"
                    className="text-sm sm:text-base text-accent hover:underline font-medium transition-colors"
                  >
                    info@hyderabadnetworks.com
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="border border-border rounded-lg p-5 sm:p-6 bg-card">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 sm:w-7 h-6 sm:h-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl mb-3 text-foreground font-semibold">Business Hours</h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-5 border border-border rounded-lg p-6 sm:p-8 bg-card">
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
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
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
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
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
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="+91 XXXX XXXX XX"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold mb-2.5 text-foreground">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Your company name"
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
                <option value="partnership">Partnership Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold mb-2.5 text-foreground">
                Quantity (Optional)
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="e.g., 50 units, 100+ pieces"
              />
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

            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 font-medium rounded-md">
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



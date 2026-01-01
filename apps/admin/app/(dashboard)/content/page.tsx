"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { toast } from "sonner"
import { Save, Plus, Trash2 } from "lucide-react"
import { Spinner } from "@workspace/ui/components/spinner"

interface ContentSection {
  id: string
  title: string
  heading: string
  description: string
  buttonText: string
  buttonLink: string
}

interface HomepageContent {
  hero: {
    heading: string
    subheading: string
    cta: string
    ctaLink: string
    backgroundImage: string
  }
  features: ContentSection[]
  testimonials: {
    enabled: boolean
    autoplay: boolean
  }
  contact: {
    heading: string
    description: string
    email: string
    phone: string
  }
}

const defaultContent: HomepageContent = {
  hero: {
    heading: "Premium Clock Distribution Network",
    subheading: "High-quality clocks for retail and bulk orders",
    cta: "Get Started",
    ctaLink: "/contact",
    backgroundImage: "/placeholder.svg",
  },
  features: [
    {
      id: "1",
      title: "Wide Selection",
      heading: "Diverse Clock Collections",
      description: "Choose from wall clocks, table clocks, digital and analog varieties",
      buttonText: "Explore Products",
      buttonLink: "/products",
    },
    {
      id: "2",
      title: "Bulk Orders",
      heading: "Wholesale Pricing",
      description: "Special rates for retailers and businesses",
      buttonText: "Bulk Inquiry",
      buttonLink: "/bulk-order",
    },
    {
      id: "3",
      title: "Quality Assured",
      heading: "Premium Manufacturing",
      description: "All products meet strict quality standards",
      buttonText: "Learn More",
      buttonLink: "/about",
    },
  ],
  testimonials: {
    enabled: true,
    autoplay: true,
  },
  contact: {
    heading: "Get in Touch",
    description: "Have questions? Our team is ready to help",
    email: "sales@hyderabadnetworks.com",
    phone: "+91-9876543210",
  },
}

export default function ContentPage() {
  const [content, setContent] = useState<HomepageContent>(defaultContent)
  const [isSaving, setIsSaving] = useState(false)

  const handleHeroChange = (field: string, value: string) => {
    setContent({
      ...content,
      hero: { ...content.hero, [field]: value },
    })
  }

  const handleContactChange = (field: string, value: string) => {
    setContent({
      ...content,
      contact: { ...content.contact, [field]: value },
    })
  }

  const handleFeatureChange = (id: string, field: string, value: string) => {
    setContent({
      ...content,
      features: content.features.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    })
  }

  const handleAddFeature = () => {
    const newId = String(Math.max(...content.features.map((f) => Number.parseInt(f.id)), 0) + 1)
    setContent({
      ...content,
      features: [
        ...content.features,
        {
          id: newId,
          title: "New Feature",
          heading: "Feature Heading",
          description: "Feature description",
          buttonText: "Action",
          buttonLink: "/",
        },
      ],
    })
  }

  const handleRemoveFeature = (id: string) => {
    setContent({
      ...content,
      features: content.features.filter((f) => f.id !== id),
    })
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      toast.success("Website content updated successfully")
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Website Content</h2>
          <p className="text-muted-foreground mt-1">Manage homepage and website content</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Spinner className="h-4 w-4 mr-2" />}
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="contact">Contact Section</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main banner content for the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroHeading">Heading</Label>
                <Input
                  id="heroHeading"
                  value={content.hero.heading}
                  onChange={(e) => handleHeroChange("heading", e.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroSubheading">Subheading</Label>
                <Textarea
                  id="heroSubheading"
                  value={content.hero.subheading}
                  onChange={(e) => handleHeroChange("subheading", e.target.value)}
                  rows={2}
                  disabled={isSaving}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heroCta">CTA Button Text</Label>
                  <Input
                    id="heroCta"
                    value={content.hero.cta}
                    onChange={(e) => handleHeroChange("cta", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroCtaLink">CTA Button Link</Label>
                  <Input
                    id="heroCtaLink"
                    value={content.hero.ctaLink}
                    onChange={(e) => handleHeroChange("ctaLink", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroBg">Background Image URL</Label>
                <Input
                  id="heroBg"
                  value={content.hero.backgroundImage}
                  onChange={(e) => handleHeroChange("backgroundImage", e.target.value)}
                  disabled={isSaving}
                  placeholder="e.g., /images/hero-bg.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Section */}
        <TabsContent value="features" className="space-y-4">
          {content.features.map((feature) => (
            <Card key={feature.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleRemoveFeature(feature.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(feature.id, "title", e.target.value)}
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input
                      value={feature.heading}
                      onChange={(e) => handleFeatureChange(feature.id, "heading", e.target.value)}
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(feature.id, "description", e.target.value)}
                    rows={2}
                    disabled={isSaving}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      value={feature.buttonText}
                      onChange={(e) => handleFeatureChange(feature.id, "buttonText", e.target.value)}
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input
                      value={feature.buttonLink}
                      onChange={(e) => handleFeatureChange(feature.id, "buttonLink", e.target.value)}
                      disabled={isSaving}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={handleAddFeature} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </TabsContent>

        {/* Testimonials Section */}
        <TabsContent value="testimonials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials Settings</CardTitle>
              <CardDescription>Configure testimonial section display</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Enable Testimonials</p>
                  <p className="text-sm text-muted-foreground">Show testimonial section on homepage</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      testimonials: { ...content.testimonials, enabled: !content.testimonials.enabled },
                    })
                  }
                >
                  {content.testimonials.enabled ? "✓ Enabled" : "○ Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Auto-play Carousel</p>
                  <p className="text-sm text-muted-foreground">Automatically cycle through testimonials</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      testimonials: { ...content.testimonials, autoplay: !content.testimonials.autoplay },
                    })
                  }
                >
                  {content.testimonials.autoplay ? "✓ On" : "○ Off"}
                </Button>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  💡 Tip: Manage individual testimonials and customer reviews in a separate testimonials management
                  module
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Section */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Section</CardTitle>
              <CardDescription>Contact information displayed on homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactHeading">Heading</Label>
                <Input
                  id="contactHeading"
                  value={content.contact.heading}
                  onChange={(e) => handleContactChange("heading", e.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactDesc">Description</Label>
                <Textarea
                  id="contactDesc"
                  value={content.contact.description}
                  onChange={(e) => handleContactChange("description", e.target.value)}
                  rows={3}
                  disabled={isSaving}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => handleContactChange("email", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={content.contact.phone}
                    onChange={(e) => handleContactChange("phone", e.target.value)}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


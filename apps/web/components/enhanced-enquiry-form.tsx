"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Plus, X, Trash2 } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { useCategories } from "@/hooks/use-categories"
import { Loader2 } from "lucide-react"

type ProductItem = {
  id: string
  modelNumber: string
  quantity: string
}

export function EnhancedEnquiryForm() {
  const { categories, loading: categoriesLoading } = useCategories()
  const categoryIds = categoriesLoading ? undefined : categories.map(c => c.id)
  const { products, loading: productsLoading } = useProducts(categoryIds)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    customizationNeeded: false,
    customizationRequirements: "",
    message: "",
  })

  const [productItems, setProductItems] = useState<ProductItem[]>([
    { id: "1", modelNumber: "", quantity: "" }
  ])

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const addProductItem = () => {
    setProductItems([...productItems, { id: Date.now().toString(), modelNumber: "", quantity: "" }])
  }

  const removeProductItem = (id: string) => {
    if (productItems.length > 1) {
      setProductItems(productItems.filter(item => item.id !== id))
    }
  }

  const updateProductItem = (id: string, field: "modelNumber" | "quantity", value: string) => {
    setProductItems(productItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Filter out empty product items
    const validProducts = productItems.filter(item => item.modelNumber.trim() && item.quantity.trim())
    
    if (validProducts.length === 0) {
      alert("Please add at least one product with model number and quantity")
      setIsSubmitting(false)
      return
    }

    const enquiryData = {
      ...formData,
      products: validProducts
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log("Enquiry submitted:", enquiryData)
    setSubmitted(true)
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      purpose: "",
      customizationNeeded: false,
      customizationRequirements: "",
      message: "",
    })
    setProductItems([{ id: "1", modelNumber: "", quantity: "" }])
    setIsSubmitting(false)
    
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  // Get unique model numbers from products for autocomplete
  const modelNumbers = products
    .map(p => p.model_number)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border border-border rounded-lg p-6 sm:p-8 bg-card">
      {/* Personal Information */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-foreground">
              Name <span className="text-red-500">*</span>
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
            <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground">
              Email <span className="text-red-500">*</span>
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
            <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-foreground">
              Phone <span className="text-red-500">*</span>
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
            <label htmlFor="company" className="block text-sm font-medium mb-1.5 text-foreground">
              Company
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
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Products</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addProductItem}
            className="flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        <div className="space-y-4">
          {productItems.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_150px_auto] gap-3 items-end p-4 border border-border rounded-md bg-muted/30">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">
                  Model Number {index === 0 && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  list={`model-numbers-${item.id}`}
                  value={item.modelNumber}
                  onChange={(e) => updateProductItem(item.id, "modelNumber", e.target.value)}
                  required={index === 0}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter model number"
                />
                <datalist id={`model-numbers-${item.id}`}>
                  {modelNumbers.map((model) => (
                    <option key={model} value={model} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">
                  Quantity {index === 0 && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => updateProductItem(item.id, "quantity", e.target.value)}
                  required={index === 0}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
                  placeholder="e.g., 50 units"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeProductItem(item.id)}
                disabled={productItems.length === 1}
                className="flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose */}
      <div>
        <label htmlFor="purpose" className="block text-sm font-medium mb-1.5 text-foreground">
          Purpose <span className="text-red-500">*</span>
        </label>
        <select
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
        >
          <option value="">Select purpose</option>
          <option value="retail">Retail Purchase</option>
          <option value="wholesale">Wholesale</option>
          <option value="bulk-order">Bulk Order</option>
          <option value="corporate">Corporate/Institutional</option>
          <option value="gift">Gift</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Customization */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <input
            type="checkbox"
            id="customizationNeeded"
            name="customizationNeeded"
            checked={formData.customizationNeeded}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border text-accent focus:ring-2 focus:ring-ring"
          />
          <label htmlFor="customizationNeeded" className="text-sm font-medium text-foreground cursor-pointer">
            Do you need customization?
          </label>
        </div>

        {formData.customizationNeeded && (
          <div>
            <label htmlFor="customizationRequirements" className="block text-sm font-medium mb-1.5 text-foreground">
              Customization Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              id="customizationRequirements"
              name="customizationRequirements"
              value={formData.customizationRequirements}
              onChange={handleChange}
              required={formData.customizationNeeded}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground resize-none"
              placeholder="Please describe your customization requirements..."
            />
          </div>
        )}
      </div>

      {/* Additional Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-foreground">
          Additional Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Any additional information or requirements..."
        />
      </div>

      {/* Submit Button */}
      {submitted ? (
        <div className="p-4 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 rounded-md text-sm border border-green-200 dark:border-green-800">
          Thank you for your enquiry! We'll get back to you soon.
        </div>
      ) : (
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </div>
      )}
    </form>
  )
}


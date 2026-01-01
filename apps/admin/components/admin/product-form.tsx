"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Spinner } from "@workspace/ui/components/spinner"

export interface ProductFormData {
  name: string
  sku: string
  category: string
  price: string | number
  stock: string | number
  description: string
  image?: string
}

interface ProductFormProps {
  product?: ProductFormData & { id?: string }
  isLoading: boolean
  onSubmit: (data: ProductFormData) => void
}

export default function ProductForm({ product, isLoading, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    price: product?.price || "",
    stock: product?.stock || "",
    description: product?.description || "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.sku || !formData.price || !formData.stock) {
      alert("Please fill in all required fields")
      return
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="E.g., Wall Clock Classic"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU Code *</Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => handleChange("sku", e.target.value)}
            placeholder="E.g., WC-001"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value: string) => handleChange("category", value)}>
            <SelectTrigger id="category" disabled={isLoading}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Wall Clocks">Wall Clocks</SelectItem>
              <SelectItem value="Table Clocks">Table Clocks</SelectItem>
              <SelectItem value="Alarm Clocks">Alarm Clocks</SelectItem>
              <SelectItem value="Digital Clocks">Digital Clocks</SelectItem>
              <SelectItem value="Analog Clocks">Analog Clocks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="0"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock Quantity *</Label>
        <Input
          id="stock"
          type="number"
          value={formData.stock}
          onChange={(e) => handleChange("stock", e.target.value)}
          placeholder="0"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Product description..."
          rows={4}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="h-4 w-4 mr-2" />}
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  )
}


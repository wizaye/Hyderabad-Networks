"use client"

import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Plus, Search, Upload, Download, Edit2, Trash2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import ProductForm, { type ProductFormData } from "@/components/admin/product-form"
import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@workspace/ui/components/spinner"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  description: string
  image: string
  created_at?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [importMessage, setImportMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
        toast.error("Failed to load products")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()

    const subscription = supabase
      .channel("products")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, (payload: any) => {
        if (payload.eventType === "INSERT") {
          setProducts((prev) => [payload.new as Product, ...prev])
        } else if (payload.eventType === "UPDATE") {
          setProducts((prev) => prev.map((p) => (p.id === payload.new.id ? (payload.new as Product) : p)))
        } else if (payload.eventType === "DELETE") {
          setProducts((prev) => prev.filter((p) => p.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [products, searchQuery])

  const handleAddProduct = async (newProduct: ProductFormData) => {
    setIsSaving(true)
    try {
      const { error } = await supabase.from("products").insert([
        {
          name: newProduct.name,
          sku: newProduct.sku,
          category: newProduct.category,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          description: newProduct.description,
          image: newProduct.image || "/placeholder.svg",
        },
      ])

      if (error) throw error
      setIsDialogOpen(false)
      toast.success("Product added successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to add product")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditProduct = async (updatedProduct: ProductFormData) => {
    if (!selectedProduct) return
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: updatedProduct.name,
          sku: updatedProduct.sku,
          category: updatedProduct.category,
          price: Number(updatedProduct.price),
          stock: Number(updatedProduct.stock),
          description: updatedProduct.description,
          image: updatedProduct.image || "/placeholder.svg",
        })
        .eq("id", selectedProduct.id)

      if (error) throw error
      setSelectedProduct(null)
      setIsDialogOpen(false)
      toast.success("Product updated successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to update product")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error
      toast.success("Product deleted successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product")
    }
  }

  const handleExportExcel = () => {
    const headers = ["Name", "SKU", "Category", "Price (₹)", "Stock", "Description"]
    const rows = products.map((p) => [p.name, p.sku, p.category, p.price, p.stock, p.description])

    const csvContent = [
      headers.map((h) => `"${h}"`).join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const element = document.createElement("a")
    element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`)
    element.setAttribute("download", `products-${new Date().toISOString().split("T")[0]}.csv`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast.success("Products exported successfully")
  }

  const handleImportExcel = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".csv")) {
      setImportMessage({ type: "error", text: "Please select a CSV file" })
      return
    }

    setIsLoading(true)
    try {
      const text = await file.text()
      const lines = text.trim().split("\n")

      if (lines.length < 2) {
        setImportMessage({ type: "error", text: "CSV file is empty" })
        setIsLoading(false)
        return
      }

      const headers = (lines[0] ?? "").split(",").map((h) => h.trim().replace(/"/g, "").toLowerCase())
      const requiredHeaders = ["name", "sku", "category", "price", "stock", "description"]
      const hasRequiredHeaders = requiredHeaders.every((h) => headers.includes(h))

      if (!hasRequiredHeaders) {
        setImportMessage({
          type: "error",
          text: `Missing required columns. Required: ${requiredHeaders.join(", ")}`,
        })
        setIsLoading(false)
        return
      }

      const importedProducts: Product[] = []

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i]
        if (!line) continue

        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
        if (values.length < requiredHeaders.length || values.every((v) => !v)) continue

        const product: Product = {
          id: `import-${Date.now()}-${i}`,
          name: values[headers.indexOf("name")] || "",
          sku: values[headers.indexOf("sku")] || "",
          category: values[headers.indexOf("category")] || "",
          price: Number.parseFloat(values[headers.indexOf("price")] || "0") || 0,
          stock: Number.parseInt(values[headers.indexOf("stock")] || "0") || 0,
          description: values[headers.indexOf("description")] || "",
          image: "/placeholder.svg",
        }

        if (product.name && product.sku) {
          importedProducts.push(product)
        }
      }

      if (importedProducts.length === 0) {
        setImportMessage({ type: "error", text: "No valid products found in file" })
        setIsLoading(false)
        return
      }

      const { error } = await supabase.from("products").insert(
        importedProducts.map((p) => ({
          name: p.name,
          sku: p.sku,
          category: p.category,
          price: p.price,
          stock: p.stock,
          description: p.description,
          image: p.image,
        })),
      )

      if (error) throw error

      setImportMessage({
        type: "success",
        text: `Successfully imported ${importedProducts.length} products`,
      })
      toast.success(`${importedProducts.length} products imported successfully`)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      setTimeout(() => setImportMessage(null), 5000)
    } catch (error: any) {
      setImportMessage({ type: "error", text: error.message || "Error processing file" })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Products</h2>
          <p className="text-muted-foreground mt-1">Manage your clock product inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedProduct(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  {selectedProduct ? "Update product details" : "Enter product information"}
                </DialogDescription>
              </DialogHeader>
              <ProductForm
                product={selectedProduct || undefined}
                isLoading={isSaving}
                onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {importMessage && (
        <Alert variant={importMessage.type === "success" ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{importMessage.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, SKU, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleImportExcel} disabled={isLoading}>
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel} disabled={isLoading}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            📝 CSV Format: Name, SKU, Category, Price, Stock, Description
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>{filteredProducts.length} products in inventory</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">₹{product.price}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={product.stock > 100 ? "default" : "secondary"}>
                          {product.stock > 100 ? "In Stock" : "Low Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(product)
                              setIsDialogOpen(true)
                            }}
                            disabled={isSaving}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={isSaving}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


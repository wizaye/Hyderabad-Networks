"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Badge } from "@workspace/ui/components/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Plus, Edit2, Trash2, Calendar, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@workspace/ui/components/spinner"

interface Banner {
  id: string
  title: string
  description: string
  offerType: "discount" | "seasonal" | "limited" | "flash"
  discountPercent?: number
  validFrom: string
  validTo: string
  isActive: boolean
  position: "homepage" | "products" | "all"
  image: string
}

const mockBanners: Banner[] = [
  {
    id: "1",
    title: "New Year Sale - Upto 30% Off",
    description: "Celebrate the New Year with amazing discounts on all wall clocks",
    offerType: "seasonal",
    discountPercent: 30,
    validFrom: "2024-12-25",
    validTo: "2025-01-15",
    isActive: true,
    position: "homepage",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Bulk Order Special",
    description: "Get exclusive discounts on bulk orders above 500 units",
    offerType: "discount",
    discountPercent: 15,
    validFrom: "2024-12-20",
    validTo: "2025-02-20",
    isActive: true,
    position: "all",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Flash Sale - Digital Clocks",
    description: "Limited time offer on digital clocks only",
    offerType: "flash",
    discountPercent: 25,
    validFrom: "2024-12-26",
    validTo: "2024-12-27",
    isActive: false,
    position: "products",
    image: "/placeholder.svg",
  },
]

const offerTypeConfig = {
  discount: { label: "Discount", color: "bg-blue-100 text-blue-800" },
  seasonal: { label: "Seasonal", color: "bg-green-100 text-green-800" },
  limited: { label: "Limited Time", color: "bg-purple-100 text-purple-800" },
  flash: { label: "Flash Sale", color: "bg-red-100 text-red-800" },
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners)
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Banner>>({})

  const activeBanners = useMemo(() => banners.filter((b) => b.isActive), [banners])
  const expiringSoon = useMemo(() => {
    const today = new Date()
    const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return banners.filter((b) => new Date(b.validTo) <= sevenDaysLater && new Date(b.validTo) >= today)
  }, [banners])

  const openAddBanner = () => {
    setSelectedBanner(null)
    setFormData({
      title: "",
      description: "",
      offerType: "discount",
      discountPercent: 0,
      validFrom: "",
      validTo: "",
      isActive: true,
      position: "homepage",
      image: "",
    })
    setIsDialogOpen(true)
  }

  const openEditBanner = (banner: Banner) => {
    setSelectedBanner(banner)
    setFormData(banner)
    setIsDialogOpen(true)
  }

  const handleSaveBanner = () => {
    if (!formData.title || !formData.validFrom || !formData.validTo) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      if (selectedBanner) {
        setBanners(banners.map((b) => (b.id === selectedBanner.id ? { ...(formData as Banner) } : b)))
        toast.success("Offer updated successfully")
      } else {
        setBanners([...banners, { ...(formData as Banner), id: String(banners.length + 1) }])
        toast.success("New offer created successfully")
      }
      setIsDialogOpen(false)
      setIsLoading(false)
    }, 500)
  }

  const handleDeleteBanner = (id: string) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      setIsLoading(true)
      setTimeout(() => {
        setBanners(banners.filter((b) => b.id !== id))
        toast.success("Offer deleted successfully")
        setIsLoading(false)
      }, 500)
    }
  }

  const toggleBannerActive = (id: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setBanners(banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)))
      toast.success("Banner status updated")
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Banners & Offers</h2>
          <p className="text-muted-foreground mt-1">Manage promotional banners and special offers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddBanner}>
              <Plus className="h-4 w-4 mr-2" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedBanner ? "Edit Offer" : "Create New Offer"}</DialogTitle>
              <DialogDescription>
                {selectedBanner ? "Update offer details" : "Set up a new promotional banner"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Offer Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="E.g., New Year Sale - 30% Off"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Offer description..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="offerType">Offer Type *</Label>
                  <Select
                    value={formData.offerType || "discount"}
                    onValueChange={(value) => setFormData({ ...formData, offerType: value as any })}
                  >
                    <SelectTrigger id="offerType" disabled={isLoading}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="limited">Limited Time</SelectItem>
                      <SelectItem value="flash">Flash Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount % (if applicable)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discountPercent || 0}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number.parseInt(e.target.value) })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Valid From *</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={formData.validFrom || ""}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validTo">Valid To *</Label>
                  <Input
                    id="validTo"
                    type="date"
                    value={formData.validTo || ""}
                    onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Display Position *</Label>
                  <Select
                    value={formData.position || "homepage"}
                    onValueChange={(value) => setFormData({ ...formData, position: value as any })}
                  >
                    <SelectTrigger id="position" disabled={isLoading}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homepage">Homepage</SelectItem>
                      <SelectItem value="products">Products Page</SelectItem>
                      <SelectItem value="all">All Pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    type="button"
                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  >
                    {formData.isActive ? "✓ Active" : "○ Inactive"}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveBanner} disabled={isLoading}>
                  {isLoading && <Spinner className="h-4 w-4 mr-2" />}
                  {selectedBanner ? "Update Offer" : "Create Offer"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{activeBanners.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active Offers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-destructive">{expiringSoon.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Expiring Soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{banners.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Offers</p>
          </CardContent>
        </Card>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <Card key={banner.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{banner.title}</CardTitle>
                  <Badge className={`mt-2 ${offerTypeConfig[banner.offerType].color}`}>
                    {offerTypeConfig[banner.offerType].label}
                  </Badge>
                </div>
                <Badge variant={banner.isActive ? "default" : "secondary"}>
                  {banner.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <p className="text-sm text-muted-foreground">{banner.description}</p>

              {banner.discountPercent && (
                <div className="text-2xl font-bold text-primary">{banner.discountPercent}% OFF</div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {banner.validFrom} to {banner.validTo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    Position: <span className="font-medium">{banner.position}</span>
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => toggleBannerActive(banner.id)}
                  disabled={isLoading}
                >
                  {banner.isActive ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Show
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEditBanner(banner)} disabled={isLoading}>
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive bg-transparent"
                  onClick={() => handleDeleteBanner(banner.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {banners.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No offers created yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


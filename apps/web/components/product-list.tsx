"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useCategories } from "@/hooks/use-categories"
import { useProducts } from "@/hooks/use-products"
import { Product } from "@/lib/types"

export function ProductList() {
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()

    // Derived category IDs for product fetching
    // If categories are loading, we pass undefined so useProducts knows to wait (or we can pass [] if we want)
    // But based on my hook logic: !categoryIds => loading. 
    // If categories loaded but empty => pass [].
    const categoryIds = categoriesLoading ? undefined : categories.map(c => c.id)

    const { products, loading: productsLoading, error: productsError } = useProducts(categoryIds)

    const [selectedCategory, setSelectedCategory] = useState<string>("")

    const loading = categoriesLoading || productsLoading
    const error = categoriesError || productsError

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category_id === selectedCategory)
        : products

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                Error loading products: {error}
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex justify-center gap-2 flex-wrap">
                <Button
                    variant={selectedCategory === "" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("")}
                    className="rounded-full"
                >
                    All
                </Button>
                {categories.map(cat => (
                    <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        onClick={() => setSelectedCategory(cat.id)}
                        className="rounded-full"
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No products found in this category.
                </div>
            )}
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Aggregate all images from all variants, attaching is_default from the variant
    const allImages = product.variants?.flatMap(v =>
        (v.images || []).map(img => ({ ...img, isVariantDefault: v.is_default }))
    ) || []

    // Sort images: Primary images first, then default variant images, then others
    const sortedImages = [...allImages].sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1
        if (!a.is_primary && b.is_primary) return 1

        // If neither is primary, prefer default variant images
        if (a.isVariantDefault && !b.isVariantDefault) return -1
        if (!a.isVariantDefault && b.isVariantDefault) return 1

        return 0
    })

    // Deduplicate images by URL
    const uniqueImages = Array.from(new Map(sortedImages.map(img => [img.image_url, img])).values())

    const hasImages = uniqueImages.length > 0
    const currentImage = hasImages ? uniqueImages[currentImageIndex] : null

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % uniqueImages.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length)
    }

    return (
        <div
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
        >
            <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center">
                {currentImage ? (
                    <>
                        {/* 
                           We use fill + object-cover + sizes to lazy load and optimize.
                           Added explicit loading="lazy" (though default in Next.js) to ensure behavior.
                        */}
                        <Image
                            src={currentImage.image_url}
                            alt={product.model_number}
                            fill
                            loading="lazy"
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        {/* Carousel Navigation - Visible on Group Hover */}
                        {uniqueImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>

                                {/* Indicators */}
                                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {uniqueImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setCurrentImageIndex(idx);
                                            }}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors box-content border border-black/10 ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <span className="text-muted-foreground text-sm">No Image</span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs text-muted-foreground mb-2 font-medium tracking-wide uppercase">
                    {product.category?.name || 'Uncategorized'}
                </div>
                <h3 className="font-serif text-xl font-medium mb-1">{product.model_number}</h3>
                <div className="text-primary font-bold mb-4">₹{product.mrp?.toLocaleString()}</div>

                {product.variants && product.variants.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {product.variants.filter(v => v.color_name).map(v => (
                            <div
                                key={v.id}
                                className="w-5 h-5 rounded-full border border-border shadow-sm ring-1 ring-background hover:scale-110 transition-transform cursor-help"
                                style={{ backgroundColor: v.color_name }}
                                title={v.color_name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

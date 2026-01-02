"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCategories } from "@/hooks/use-categories"
import { useProducts } from "@/hooks/use-products"
import { Product } from "@/lib/types"

export function ProductGlimpse() {
    const { categories, loading: categoriesLoading } = useCategories()
    const categoryIds = categoriesLoading ? undefined : categories.map(c => c.id)
    const { products, loading: productsLoading } = useProducts(categoryIds)

    const loading = categoriesLoading || productsLoading

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        )
    }

    const displayProducts = products.slice(0, 8)

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length > 8 && (
                <div className="text-center pt-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                        View All Products ({products.length})
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                </div>
            )}
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    const allImages = product.variants?.flatMap(v =>
        (v.images || []).map(img => ({ ...img, isVariantDefault: v.is_default }))
    ) || []

    const sortedImages = [...allImages].sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1
        if (!a.is_primary && b.is_primary) return 1
        if (a.isVariantDefault && !b.isVariantDefault) return -1
        if (!a.isVariantDefault && b.isVariantDefault) return 1
        return 0
    })

    const uniqueImages = Array.from(new Map(sortedImages.map(img => [img.image_url, img])).values())
    const currentImage = uniqueImages[0]

    return (
        <Link href="/products" className="group block">
            <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-colors">
                <div className="aspect-square bg-muted relative overflow-hidden">
                    {currentImage ? (
                        <Image
                            src={currentImage.image_url}
                            alt={product.model_number}
                            fill
                            loading="lazy"
                            className="object-contain w-full h-full p-2"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            No Image
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <div className="text-xs text-muted-foreground mb-1 uppercase">
                        {product.category?.name || 'Uncategorized'}
                    </div>
                    <h3 className="font-medium text-sm mb-1.5 line-clamp-2 text-foreground">
                        {product.model_number}
                    </h3>
                    <div className="text-base font-semibold text-foreground">
                        ₹{product.mrp?.toLocaleString()}
                    </div>
                </div>
            </div>
        </Link>
    )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@workspace/ui/components/button"
import { Loader2, Filter } from "lucide-react"
import Image from "next/image"
import { useCategories } from "@/hooks/use-categories"
import { useProductsPaginated } from "@/hooks/use-products-paginated"
import { Product } from "@/lib/types"

export function EnhancedProductList() {
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const { products, loading, error, hasMore, loadMore } = useProductsPaginated(selectedCategory || undefined)
    const observerTarget = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasMore && !loading) {
                    loadMore()
                }
            },
            { threshold: 0.1 }
        )

        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [hasMore, loading, loadMore])

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (categoriesLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (categoriesError) {
        return (
            <div className="text-center py-20 text-red-500">
                Error loading categories: {categoriesError}
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Enhanced Category Filters */}
            <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter by Category</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button
                        variant={selectedCategory === "" ? "default" : "outline"}
                        onClick={() => handleCategoryChange("")}
                        className="rounded-full px-6 py-2.5 transition-all duration-200 hover:scale-105 font-medium"
                    >
                        All Products
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat.id}
                            variant={selectedCategory === cat.id ? "default" : "outline"}
                            onClick={() => handleCategoryChange(cat.id)}
                            className="rounded-full px-6 py-2.5 transition-all duration-200 hover:scale-105 font-medium"
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            {error ? (
                <div className="text-center py-20 text-red-500">
                    Error loading products: {error}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((product, index) => (
                            <div 
                                key={product.id}
                                className="animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: `${Math.min(index, 20) * 50}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {products.length === 0 && !loading && (
                        <div className="text-center py-20 text-muted-foreground">
                            No products found in this category.
                        </div>
                    )}

                    {/* Lazy Loading Trigger */}
                    {hasMore && (
                        <div ref={observerTarget} className="flex justify-center py-8">
                            {loading && (
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            )}
                        </div>
                    )}

                    {/* Manual Load More Button (fallback) */}
                    {hasMore && !loading && (
                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={loadMore}
                                variant="outline"
                                className="rounded-lg px-8 py-6"
                            >
                                Load More Products
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
            className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2 transition-all duration-300 flex flex-col relative"
        >
            <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center">
                {currentImage ? (
                    <>
                        <Image
                            src={currentImage.image_url}
                            alt={product.model_number}
                            fill
                            loading="lazy"
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

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

                                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {uniqueImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                setCurrentImageIndex(idx)
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


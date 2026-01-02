"use client"

import { useState, useEffect } from "react"
import { Button } from "@workspace/ui/components/button"
import { Loader2, ChevronDown, SlidersHorizontal, ArrowUpDown, Search } from "lucide-react"
import Image from "next/image"
import { useCategories } from "@/hooks/use-categories"
import { useProductsWithFilters, SortOption } from "@/hooks/use-products-with-filters"
import { Product } from "@/lib/types"
import { useSearchParams, useRouter } from "next/navigation"

export function EcommerceProductList() {
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [sortBy, setSortBy] = useState<SortOption>("model_number")
    const [currentPage, setCurrentPage] = useState(0)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    // Initialize from URL params
    useEffect(() => {
        const category = searchParams.get("category") || ""
        const search = searchParams.get("search") || ""
        const sort = (searchParams.get("sort") as SortOption) || "model_number"
        setSelectedCategory(category)
        setSearchQuery(search)
        setSortBy(sort)
    }, [searchParams])

    const { products, loading, error, totalCount, totalPages } = useProductsWithFilters(
        currentPage,
        selectedCategory || undefined,
        searchQuery || undefined,
        sortBy
    )


    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId)
        setCurrentPage(0)
        setIsCategoryOpen(false)
        const params = new URLSearchParams()
        if (categoryId) params.set("category", categoryId)
        if (searchQuery) params.set("search", searchQuery)
        if (sortBy !== "model_number") params.set("sort", sortBy)
        router.replace(`/products?${params.toString()}`)
    }

    const handleSortChange = (sort: SortOption) => {
        setSortBy(sort)
        setCurrentPage(0)
        setIsSortOpen(false)
        const params = new URLSearchParams()
        if (selectedCategory) params.set("category", selectedCategory)
        if (searchQuery) params.set("search", searchQuery)
        if (sort !== "model_number") params.set("sort", sort)
        router.replace(`/products?${params.toString()}`)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: "model_number", label: "Model Number (A-Z)" },
        { value: "mrp_asc", label: "Price: Low to High" },
        { value: "mrp_desc", label: "Price: High to Low" },
        { value: "created_at", label: "Newest First" },
    ]

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
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="w-full">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        setCurrentPage(0)
                        const params = new URLSearchParams()
                        if (searchQuery) params.set("search", searchQuery)
                        if (selectedCategory) params.set("category", selectedCategory)
                        if (sortBy !== "model_number") params.set("sort", sortBy)
                        router.replace(`/products?${params.toString()}`)
                    }}
                    className="relative"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by model number..."
                        className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                </form>
            </div>

            {/* Filters and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between p-4 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border">
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Category Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsCategoryOpen(!isCategoryOpen)
                                setIsSortOpen(false)
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            {selectedCategory 
                                ? categories.find(c => c.id === selectedCategory)?.name || "Category"
                                : "All Categories"
                            }
                            <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isCategoryOpen && (
                            <>
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setIsCategoryOpen(false)}
                                />
                                <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
                                    <button
                                        onClick={() => handleCategoryChange("")}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                                            !selectedCategory ? "bg-accent/10 font-medium" : ""
                                        }`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryChange(cat.id)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                                                selectedCategory === cat.id ? "bg-accent/10 font-medium" : ""
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setIsSortOpen(!isSortOpen)
                                setIsCategoryOpen(false)
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
                        >
                            <ArrowUpDown className="w-4 h-4" />
                            {sortOptions.find(o => o.value === sortBy)?.label || "Sort"}
                            <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSortOpen && (
                            <>
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setIsSortOpen(false)}
                                />
                                <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl z-20">
                                    {sortOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSortChange(option.value)}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                                                sortBy === option.value ? "bg-accent/10 font-medium" : ""
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-xs sm:text-sm text-muted-foreground">
                    {loading ? (
                        "Loading..."
                    ) : (
                        <>
                            {totalCount > 0 ? (
                                <>
                                    Showing {currentPage * 12 + 1} - {Math.min((currentPage + 1) * 12, totalCount)} of {totalCount}
                                </>
                            ) : (
                                "No products found"
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            {error ? (
                <div className="text-center py-20 text-red-500">
                    Error loading products: {error}
                </div>
            ) : loading && products.length === 0 ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg mb-4">No products found</p>
                    <p className="text-sm text-muted-foreground">
                        {searchQuery ? `No products match "${searchQuery}"` : "Try adjusting your filters"}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-8">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0 || loading}
                                className="rounded-lg"
                            >
                                Previous
                            </Button>
                            
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                    let pageNum: number
                                    if (totalPages <= 7) {
                                        pageNum = i
                                    } else if (currentPage < 3) {
                                        pageNum = i
                                    } else if (currentPage > totalPages - 4) {
                                        pageNum = totalPages - 7 + i
                                    } else {
                                        pageNum = currentPage - 3 + i
                                    }
                                    
                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            onClick={() => handlePageChange(pageNum)}
                                            disabled={loading}
                                            className="rounded-lg min-w-[40px]"
                                        >
                                            {pageNum + 1}
                                        </Button>
                                    )
                                })}
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1 || loading}
                                className="rounded-lg"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

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

    const nextImage = () => {
        if (uniqueImages.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % uniqueImages.length)
        }
    }

    const prevImage = () => {
        if (uniqueImages.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length)
        }
    }

    return (
        <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-colors flex flex-col">
            {/* Image Container */}
            <div className="aspect-square bg-gray-50 dark:bg-muted relative overflow-hidden">
                {currentImage ? (
                    <>
                        <Image
                            src={currentImage.image_url}
                            alt={product.model_number}
                            fill
                            loading="lazy"
                            className="object-contain w-full h-full p-2 transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        
                        {/* Image Navigation */}
                        {uniqueImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        prevImage()
                                    }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/50 text-gray-800 dark:text-white rounded-full p-1.5 hover:bg-white dark:hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20 shadow-md"
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        nextImage()
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/50 text-gray-800 dark:text-white rounded-full p-1.5 hover:bg-white dark:hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20 shadow-md"
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        No Image
                    </div>
                )}
                
                {/* Image indicators */}
                {uniqueImages.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {uniqueImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentImageIndex(idx)
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    idx === currentImageIndex ? 'bg-accent scale-125' : 'bg-white/60 hover:bg-white/80'
                                }`}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <div className="text-xs text-muted-foreground mb-1 font-medium uppercase">
                    {product.category?.name || 'Uncategorized'}
                </div>
                <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] text-foreground">
                    {product.model_number}
                </h3>
                <div className="mt-auto">
                    <div className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                        ₹{product.mrp?.toLocaleString()}
                    </div>
                    {product.variants && product.variants.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {product.variants.filter(v => v.color_name).slice(0, 4).map(v => (
                                <div
                                    key={v.id}
                                    className="w-4 h-4 rounded-full border border-border cursor-help"
                                    style={{ backgroundColor: v.color_name }}
                                    title={v.color_name}
                                />
                            ))}
                            {product.variants.filter(v => v.color_name).length > 4 && (
                                <span className="text-xs text-muted-foreground">
                                    +{product.variants.filter(v => v.color_name).length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"

const ITEMS_PER_PAGE = 12

export type SortOption = "model_number" | "mrp_asc" | "mrp_desc" | "created_at"

export function useProductsWithFilters(
    page: number,
    categoryId?: string,
    searchQuery?: string,
    sortBy: SortOption = "model_number"
) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [totalCount, setTotalCount] = useState(0)

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            let query = supabase
                .from('products')
                .select(`
                    *,
                    category:categories(*),
                    variants:product_variants(
                        *,
                        images:product_images(*)
                    )
                `, { count: 'exact' })
                .eq('is_active', true)

            // Apply category filter
            if (categoryId) {
                query = query.eq('category_id', categoryId)
            }

            // Apply search filter
            if (searchQuery && searchQuery.trim()) {
                query = query.ilike('model_number', `%${searchQuery.trim()}%`)
            }

            // Apply sorting
            switch (sortBy) {
                case "mrp_asc":
                    query = query.order('mrp', { ascending: true })
                    break
                case "mrp_desc":
                    query = query.order('mrp', { ascending: false })
                    break
                case "created_at":
                    query = query.order('created_at', { ascending: false })
                    break
                default:
                    query = query.order('model_number', { ascending: true })
            }

            // Apply pagination
            const from = page * ITEMS_PER_PAGE
            const to = (page + 1) * ITEMS_PER_PAGE - 1
            query = query.range(from, to)

            const { data, error: queryError, count } = await query

            if (queryError) throw queryError

            setProducts(data || [])
            setTotalCount(count || 0)
        } catch (err: any) {
            console.error('Error loading products:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [page, categoryId, searchQuery, sortBy])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return { products, loading, error, totalCount, totalPages }
}


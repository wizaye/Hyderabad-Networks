import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"

const ITEMS_PER_PAGE = 12

export function useProductsPaginated(categoryId?: string) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const loadProducts = useCallback(async (pageNum: number, category?: string, reset: boolean = false) => {
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
                .order('model_number')
                .range(pageNum * ITEMS_PER_PAGE, (pageNum + 1) * ITEMS_PER_PAGE - 1)

            if (category) {
                query = query.eq('category_id', category)
            }

            const { data, error: queryError, count } = await query

            if (queryError) throw queryError

            const productsData = data || []
            
            if (reset) {
                setProducts(productsData)
            } else {
                setProducts(prev => [...prev, ...productsData])
            }

            setHasMore(productsData.length === ITEMS_PER_PAGE && (count || 0) > (pageNum + 1) * ITEMS_PER_PAGE)
        } catch (err: any) {
            console.error('Error loading products:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        setPage(0)
        setProducts([])
        setHasMore(true)
        loadProducts(0, categoryId, true)
    }, [categoryId, loadProducts])

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            loadProducts(nextPage, categoryId, false)
        }
    }, [page, categoryId, loading, hasMore, loadProducts])

    return { products, loading, error, hasMore, loadMore }
}


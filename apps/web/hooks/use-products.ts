import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/lib/types"

// Simple in-memory cache
// We map a key (derived from category IDs) to the products
const productsCache: Record<string, Product[]> = {}

export function useProducts(categoryIds?: string[]) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // If categories are undefined (loading), don't fetch yet or fetch all?
        // Original logic: fetched based on loaded categories.
        // If we don't pass categoryIds, we might want to wait or fetch all.
        // Let's assume if categoryIds is undefined, we wait. If it's an empty array, it means no categories found?
        // Or we controls this from the component.

        if (!categoryIds) {
            setLoading(true)
            return
        }

        const cacheKey = categoryIds.sort().join(',')

        if (productsCache[cacheKey]) {
            setProducts(productsCache[cacheKey])
            setLoading(false)
            return
        }

        async function loadProducts() {
            try {
                setLoading(true)

                let query = supabase
                    .from('products')
                    .select(`
            *,
            category:categories(*),
            variants:product_variants(
              *,
              images:product_images(*)
            )
          `)
                    .eq('is_active', true)

                if (categoryIds && categoryIds.length > 0) {
                    query = query.in('category_id', categoryIds)
                }

                const { data, error } = await query.order('model_number')

                if (error) throw error

                const productsData = data || []
                productsCache[cacheKey] = productsData
                setProducts(productsData)
            } catch (err: any) {
                console.error('Error loading products:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [categoryIds]) // Re-run if categoryIds changes

    return { products, loading, error }
}

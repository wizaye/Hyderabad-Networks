import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Category } from "@/lib/types"

// Simple in-memory cache
let categoriesCache: Category[] | null = null

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (categoriesCache) {
            setCategories(categoriesCache)
            setLoading(false)
            return
        }

        async function loadCategories() {
            try {
                setLoading(true)
                let categoriesData: Category[] = []

                // Try with hide_from_display first (as per original logic), fallback to simple query
                try {
                    const { data, error } = await supabase
                        .from('categories')
                        .select('*')
                        .eq('is_active', true)
                        .eq('hide_from_display', false)
                        .order('name')

                    if (error) throw error
                    categoriesData = data || []
                } catch (err: any) {
                    console.warn('Fallback category fetch', err)
                    const { data } = await supabase
                        .from('categories')
                        .select('*')
                        .eq('is_active', true)
                        .order('name')
                    categoriesData = data || []
                }

                categoriesCache = categoriesData
                setCategories(categoriesData)
            } catch (err: any) {
                console.error('Error loading categories:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadCategories()
    }, [])

    return { categories, loading, error }
}

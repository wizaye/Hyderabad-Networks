export type Category = {
    id: string
    name: string
    is_active?: boolean
    hide_from_display?: boolean
}

export type ProductImage = {
    image_url: string
    is_primary: boolean
}

export type ProductVariant = {
    id: string
    color_name: string
    is_default: boolean
    images?: ProductImage[]
}

export type Product = {
    id: string
    model_number: string
    mrp: number
    category_id: string
    is_active: boolean
    category?: {
        name: string
    }
    variants?: ProductVariant[]
}

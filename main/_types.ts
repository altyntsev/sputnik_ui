export interface Project {
    project_id: number
    login: string
    name: string
    start_date?: string
    end_date?: string
    border: string
    border_gj: string
}

export interface Meta {
    project_id: number
    scene_id: string
    date: string
    border: string
    filename: string
}

export interface Product {
    product: string
    product_id: string
    date: string
    meta?: any
}


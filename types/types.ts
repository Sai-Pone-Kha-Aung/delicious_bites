export type MenuType = {
    id: number
    title: string
    slug: string
    desc: string
    img: string
    color: string
}[];

export type ProductType = {
    id: number
    title: string
    desc?: string
    img?: string
    price: number
    options?: {
        title: string
        additionalPrice: number
    }
};

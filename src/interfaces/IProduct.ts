export interface IProduct {
    id?: number;
    title: string;
    price: number;
    description: string;
    discountPercentage: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}
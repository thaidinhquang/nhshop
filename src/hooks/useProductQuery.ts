import { getAllProducts, getProductById } from "@/services/product";
import { useQuery } from "@tanstack/react-query";

export const useProductQuery = (id?: number | string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["PRODUCT_KEY", id],
        queryFn: async () => {
            return id ? await getProductById(id as number | string) : await getAllProducts()
        },
    });

    return { data, ...rest };
}
import { getAllCategories } from "@/services/category"
import { useQuery } from "@tanstack/react-query"

export const useCategoryQuery = (options?: any) => {
    const { data, ...rest } = useQuery({
        queryKey: ['CATEGORY_KEY', options],
        queryFn: async () => {
            return getAllCategories();
        }
    })

    return { data, ...rest }
}


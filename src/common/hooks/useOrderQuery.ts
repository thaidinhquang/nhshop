import { getAllOrder } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

export const useOrderQuery = (options?: any) => {
    const { data, ...rest } = useQuery({
        queryKey: ['ORDER_KEY', options],
        queryFn: async () => {
            return getAllOrder();
        }
    })

    return { data, ...rest }
}
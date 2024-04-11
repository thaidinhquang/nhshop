import { getAllUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (options?: any) => {
    const { data, ...rest } = useQuery({
        queryKey: ['USER_KEY', options],
        queryFn: async () => {
            return getAllUser();
        }
    })

    return { data, ...rest }
}
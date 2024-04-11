import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services/crud";
type props = {
    path: string,
    limitProductOnPage?: number,
    id?: number,
    mustHaveID?: boolean
    active?: boolean
}
const useHookQuery = ({ path, limitProductOnPage, id, mustHaveID, active }: props) => {
    const { data, ...rest } = useQuery({
        queryKey: [path, limitProductOnPage, id, active],
        queryFn: async () => {
            if (limitProductOnPage! > 0) {
                return await getApi(`${path}?_sort=id&_order=desc&_limit=${limitProductOnPage}${active != undefined ? `&active=${active}` : ''}`)
            }
            if (id! > 0) {
                return await getApi(`${path}/${id}${active != undefined ? `?active=${active}` : ''}`)
            }
            if (mustHaveID && !id) {
                return null
            }
            return await getApi(`${path}?_sort=id&_order=desc${active != undefined ? `&active=${active}` : ''}`)
        }
    });
    return { data, ...rest };
};

export const useCartQuery = (id: number | undefined) => {
    const { data, ...rest } = useQuery({
        queryKey: ['cart', id],
        queryFn: async () => {
            if (id != undefined) {
                return await getApi(`cart?user = ${id}`)
            }
            return null
        }
    });
    return { data, ...rest };
}
export default useHookQuery;
import { IOrder } from "@/common/types/order"
import instance from "@/configs/axios"

export const getAllOrder = async (params?: any): Promise<IOrder[]> => {
    try {
        const response = await instance.get('/orders', { params })
        return response.data
    } catch (error) {
        return []
    }
}

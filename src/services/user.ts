import { IUser } from "@/common/types/user";
import instance from "@/configs/axios";

const { token } = JSON.parse(localStorage.getItem('user') || '');
export const getAllUser = async (params?: any): Promise<IUser[]> => {
    try {
        const response = await instance.get('auth/user', { params })
        return response.data
    } catch (error) {
        return []
    }
}
export const deleteUser = async (id: number) => {
    try {
        const response = await instance.delete(`auth/user/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
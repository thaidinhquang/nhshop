import { ICategory } from "@/common/types/category"
import instance from "@/configs/axios"
const { token } = JSON.parse(localStorage.getItem('user') || '');
export const getAllCategories = async (params?: any): Promise<ICategory[]> => {
    try {
        const response = await instance.get('/categories', { params })
        return response.data
    } catch (error) {
        return []
    }
}

export const addCategory = async (category: ICategory) => {
    try {
        const response = await instance.post(`/categories`, category, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token ? token : ''
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editCategory = async (category: ICategory) => {
    try {
        const response = await instance.put(`/categories/${category?._id}`, category, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token ? token : ''
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteCategory = async (id: number) => {
    try {
        const response = await instance.delete(`/categories/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
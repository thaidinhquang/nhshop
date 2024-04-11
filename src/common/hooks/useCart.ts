import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from './useStorage'
import axios from 'axios'
import { debounce, reduce } from 'lodash'
import { ChangeEvent } from 'react'

const useCart = () => {
    const queryClient = useQueryClient()
    const [user] = useLocalStorage('user', {})
    const userId = user?.user?._id

    const { data, ...restQuery } = useQuery({
        queryKey: ['cart', userId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/carts/${userId}`)
            return data
        }
    })

    const updateQuantityDebounce = debounce(async (productId, quantity: number) => {
        await axios.post(`http://localhost:8080/api/v1/carts/update`, {
            userId,
            productId,
            quantity
        })
        queryClient.invalidateQueries({
            queryKey: ['cart', userId]
        })
    }, 300)

    
    const { mutate } = useMutation({
        mutationFn: async ({ action, productId, quantity }: { action: string; productId: string; quantity: number }) => {
            switch (action) {
                case 'ADD-TO-CART': {
                    await axios.post(`http://localhost:8080/api/v1/carts/add-to-cart`, {
                        userId,
                        productId,
                        quantity
                    })
                    break;
                }
                case 'INCREMENT':
                    await axios.post(`http://localhost:8080/api/v1/carts/increase`, {
                        userId,
                        productId
                    })
                    break
                case 'DECREMENT':
                    await axios.post(`http://localhost:8080/api/v1/carts/decrease`, {
                        userId,
                        productId
                    })
                    break
                case 'REMOVE':
                    if(confirm('Bạn có muốn xóa ?')){

                        await axios.post(`http://localhost:8080/api/v1/carts/remove`, {
                            userId,
                            productId
                        })
                    }
                    break
            }
        },
       onSuccess: (data, variables) => {
        const {action} = variables
        queryClient.invalidateQueries({
            queryKey: ['cart', userId]
        });
        if (action === 'ADD-TO-CART') {
            alert('Thêm sản phẩm vào giỏ hàng thành công');
        }
    }
    })
    
    const handleQuantityChange = (productId: string, e: ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(e.target.value)
        updateQuantityDebounce(productId, quantity)
    }
    const calculateTotal = () => {
        if (!data || !data.products) return 0
        return reduce(data.products, (total, product) => total + product.price * product.quantity, 0)
    }
    const getPayment = (paymentMethod: any) => {
        switch(paymentMethod) {
            case 'cash': 
                return "Trả tiền khi nhận hàng"
            case 'bank':
                return "Thanh toán bằng tài khoản ngân hàng"
            default: "Không xác định"
        }
    }
    const calculateTotalProducts = (data: any) => {
        if (!data || !data.items) return 0;

        let totalProducts = 0;

        data.items.forEach(item => {
            totalProducts += item.quantity; 
        });
        
        return totalProducts;
        };
    
  
    return {
        data,
        mutate,
        calculateTotal,
        calculateTotalProducts,
        handleQuantityChange,
        getPayment,
        ...restQuery
    }
}

export default useCart

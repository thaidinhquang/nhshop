import {  useState } from "react"
import image18 from'../assets/icons/18.svg'
// import { useNavigate } from "react-router-dom"
import useHookQuery, { useCartQuery } from "../hooks/useHookQuery"
import { useCartMutation } from "../hooks/useHookMutation"
import { ICart } from "../interface/ICart"
import { IProduct } from "../interface/IProduct"
import Service from "../home/Service"
import Banner from "../home/Banner"



const Cart = () => {
    
    const { data, isLoading, refetch } = useCartQuery(0)
    const { data: listProduct, isLoading: isLoadingProduct } = useHookQuery({ path: 'products' })
    const [confirm, setConfirm] = useState(0)
    const subtotal: number[] = []
    localStorage.setItem('cartData', JSON.stringify(data));

    let total: number = 0
    const { mutate } = useCartMutation('DELETE', 'Xóa giỏ hàng thành công')
    
    const [quantities, setQuantities] = useState<{ [productId: number]: number }>({})
     // Tăng số lượng của sản phẩm
     const increaseQuantity = (productId: number) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: (prevQuantities[productId] || 0) + 1
        }))
    }

    // Giảm số lượng của sản phẩm
    const decreaseQuantity = (productId: number) => {
        setQuantities(prevQuantities => {
            const newQuantity = (prevQuantities[productId] || 0) - 1
            return {
                ...prevQuantities,
                [productId]: newQuantity > 0 ? newQuantity : 0
            }
        })
    }


    return (
        <div>
            <Banner/>
            <div className="container md:flex md:justify-between gap-8 py-12">
                {isLoading || isLoadingProduct ? <div>Loading...</div> :
                    <table className='table-fixed w-full'>
                        <thead>
                            <tr className='bg-[#F9F1E7]'>
                                <td className='font-medium text-black py-4'></td>
                                <td className='font-medium text-black py-4'>Product</td>
                                <td className='font-medium text-black py-4'>Price</td>
                                <td className='font-medium text-black py-4'>Quantity</td>
                                <td className='font-medium text-black py-4'>Subtotal</td>
                                <td className='font-medium text-black py-4'></td>
                            </tr>
                        </thead>
                        <tbody>
                            {!data?.length ? <tr><td colSpan={6} className='text-center'>No product in cart</td></tr> :
                                data.map((item: ICart) => {
                                    const product = listProduct?.find((product: IProduct) => product.id === item.product);
                                    const quantity = quantities[product?.id || 0] || item.quantity
                                    subtotal.push(product?.price * quantity)
                                    return (
                                        <tr key={item.id}>
                                            <td className='text-black py-4'><img className='w-16 h-16 object-cover' src={product?.image} alt={product?.name} /></td>
                                            <td className='text-black py-4'>{product?.name}</td>
                                            <td className='text-black py-4'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product?.price)}</td>
                                            <td><button onClick={() => decreaseQuantity(product?.id || 0)} className="mx-2.5">-</button>
                                                {quantity}
                                                <button onClick={() => increaseQuantity(product?.id || 0)} className="mx-2.5">+</button>
                                                </td>
                                            <td className='text-black py-4'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product?.price * item.quantity)}</td>
                                            <td className='text-black py-4'>
                                                <button onClick={() => {
                                                    if (confirm == product.id) {
                                                        mutate(item)
                                                        refetch()
                                                        refetch()
                                                        setConfirm(0)
                                                    } else {
                                                        setConfirm(product.id)
                                                    }
                                                }}>
                                                    {confirm == product.id ? "Sure" : <img src={image18} alt="" />}
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
                <div className='w-2/5'>
                    <div className='bg-[#F9F1E7] px-16 py-4 w-full'>
                        <h2 className='text-center text-[32px] font-semibold mb-12'>Cart Totals</h2>
                        <div className='flex justify-between mb-6'>
                            <h3 className='font-medium'>Subtotal</h3>
                            <div className="text-right">
                                {subtotal.map((item, index) => {
                                    total = total + item
                                    return <span key={index} className='text-[#9F9F9F] block'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item)}đ</span>
                                })}
                            </div>
                        </div>
                        <div className='flex justify-between mb-8'>
                            <h3 className='font-medium'>Total</h3>
                            <span className='text-xl text-[#B88E2F]'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(total)}đ</span>
                        </div>
                        <a className='flex justify-center mb-16' href="/checkout"><button className='text-xl py-3 px-12 border-black border-[1px] rounded-2xl block self-center'>Check Out</button></a>
                    </div>
                </div>
            </div>
            <Service />
        </div>
    )
}

export default Cart
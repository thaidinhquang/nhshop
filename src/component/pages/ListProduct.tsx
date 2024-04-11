import { IProduct } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";
import { useCartQuery } from "../hooks/useHookQuery";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { ICart } from "../../interfaces/ICart";
import { useCartMutation } from "../hooks/useHookMutation";
import { errorMessage } from "../hooks/useMessage";

const ListProductPage = ({ data }: { data: IProduct[] }) => {
    const { user } = useContext(UserContext)
    const { data: listCart, refetch } = useCartQuery(user && user.id)
    const { mutate: addToCart, isPending: isAddpPending } = useCartMutation('CREATE', 'Add to cart successfully')
    const { mutate: updateCart, isPending: isUpdatePending } = useCartMutation('UPDATE', 'Update cart successfully')
    const [timer, setTimer] = useState(0)
    const handleAddToCart = (product: IProduct) => {
        if (timer > 0) {
            errorMessage('Too fast, try again later')
            console.log(timer);
        }
        else {
            setTimer(1)
            const cart = listCart.find((item: ICart) => item.product === product.id)
            if (cart) {
                updateCart({ ...cart, quantity: cart.quantity + 1 })
                setTimer(1)
            } else {
                addToCart({ user: user.id, product: product.id!, quantity: 1 })
            }
            refetch()
            refetch()
            setTimeout(() => {
                setTimer(0)
            }, 3000)
        }
    }
    return (
        <div>
            <div className="product-list mb-8">
                {data && data.map((item: IProduct, index: number) => (
                    <div className="product-item" key={index}>
                        <div className="product-image">
                            <img src={item.thumbnail} alt={item.title} className="product__thumbnail h-[300px] object-cover" />
                            <span className={`product-sale ${item.discountPercentage == 0 && "hidden"} ${item.discountPercentage >= 50 && "bg-green-600"}`}>{item.discountPercentage}%</span>
                        </div>
                        <div className="product-info">
                            <h3 className="product__name">
                                <a href="" className="product__link">{item.title}</a>
                            </h3>
                            <a href="" className="product__category">Danh mục : {item.category}</a>
                            <div className="">
                                <span className={`text-xl text-[##3A3A3A] font-semibold`}>
                                    {Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price - (item.price * item.discountPercentage / 100))}
                                </span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button className="bg-white text-black"><Link to={`/detail/${item.id}`}>Quick View</Link></button>
                            <button onClick={() => user ? handleAddToCart(item) : errorMessage('login first', 'top-right')} className="bg-white text-black">{isAddpPending ? "Adding" : isUpdatePending ? "Updating" : "Add To Cart"}</button>
                            <div className="product-actions-more">
                                <span className="product-action__share">Share</span>
                                <span className="product-action__compare mx-3">Compare</span>
                                <span className="product-action__like">Like</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ListProductPage

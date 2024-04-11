/* eslint-disable @typescript-eslint/no-explicit-any */

import useCart from '@/common/hooks/useCart'
import { Service1, Service2, Service3 } from '@/upload'
import { Link } from 'react-router-dom'
import Banner from '../home/_component/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const CartPage = () => {
    const { data, mutate, handleQuantityChange, calculateTotal, isLoading, isError } = useCart()
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>

    return (
      <div className="">
          <Banner />
      <div className="container cart">
        <div className=" cart__container">
          <table className="cart-table">
            <thead>
              <tr className='cart-table__head'>
                <td className='cart-table__header'></td>
                <td className='cart-table__header'>Product</td>
                <td className='cart-table__header'>Price</td>
                <td className='cart-table__header'>Quantity</td>
                <td className='cart-table__header'>Subtotal</td>
                <td className='cart-table__header'></td>
              </tr>
            </thead>
            <tbody className="cart-table__body">
            {data?.products.map((product: any, index: number) => (

              <tr className="cart-table__row" key={index}>
                  <td className=" text-center cart-table__img">
                      <img
                      src={product.image}
                      alt="ảnh"
                      className="cart-table__img"
                    />
                  </td>
                <td className=" text-center cart-table__data">
                  <div className="cart-table__test">
                   
                    <span className="cart-table__note">{product.name}</span>
                  </div>
                </td>
                <td className=" text-center cart-table__data cart-table__price">{product.price}$</td>
                <td className=" text-center cart-table__data cart-table__quantity">
                <button
                                        className='py-2 px-4 bg-[#f9f1e7]'
                                        onClick={() =>
                                            mutate({
                                                action: 'DECREMENT',
                                                productId: product.productId
                                            })
                                        }
                                    >
                                        <FontAwesomeIcon icon={faMinus}
                                        >
                                        </FontAwesomeIcon>
                                    </button>
                                    {product.quantity}
                                    <button
                                        className='py-2 px-4 bg-[#f9f1e7]'
                                        onClick={() =>
                                            mutate({
                                                action: 'INCREMENT',
                                                productId: product.productId
                                            })
                                        }
                                    >
                                       <FontAwesomeIcon icon={faPlus}
                                        >
                                        </FontAwesomeIcon>
                                    </button>
                </td>
                <td className=" text-center cart-table__data">
                  <div className="cart-table__total">
                   {product.price * product.quantity}$
                   
                  </div>
                </td>
                <td><button
                                        className='py-2 px-4 bg-red-500 text-white rounded-sm'
                                        onClick={() =>
                                            mutate({
                                                action: 'REMOVE',
                                                productId: product.productId
                                            })
                                        }
                                    >
                                        Xóa
                                    </button></td>
              </tr>
            ))}
  
            </tbody>
          </table>
          
        <div className="cart-totals">
            
          <div className="">
              <p className="cart-totals__name">Cart Totals</p>

              <div className="">
                <div className="cart-totals__subtotal">
                <p>Subtotal</p>
                <span>{calculateTotal()}$</span>
              </div>
              <div className="cart-totals__total">
                <p>Total:</p>
                <span>{calculateTotal()}$</span>
              </div>
              </div>
              <button className="cart-totals__checkOut"><Link to={`/order`}>Check Out</Link></button>
            </div>
          </div>
        </div>
      </div>
        <div className='service-list my-4'>
                    <div className='service-item'>
                        <img src={Service1} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className='service-item'>
                        <img src={Service2} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className='service-item'>
                        <img src={Service3} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className='service-item'>
                        <img src={Service1} className='service__image' />
                        <div className='service-info'>
                            <h4 className='service__name'>High Quality</h4>
                            <p className='service__description'>crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
          </div>
      </div>
    )
}

export default CartPage



import { Link, useLocation, useParams } from "react-router-dom"
import Banner from "../home/_component/Banner"
import { Success } from "@/upload"
import useCart from "@/common/hooks/useCart"
import { useEffect, useState } from "react"
import { number } from "joi"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useLocalStorage } from "@/common/hooks/useStorage"

const OrderSuccess = () => {
  const {data, calculateTotal, getPayment} = useCart();
  const [shipped, setShipped] = useState(2)
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { id } = useParams();
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod;
  
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['ORDER_KEY'],
    queryFn: async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/orders/`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch orders');
        }
    },
});

if (isLoading) {
    return <div>Loading...</div>;
}

if (isError) {
    return <div>Error: Failed to fetch orders</div>;
}

  return (
    <div>
        <Banner />
      <div className="container text-center">
        <div className="">
          <img src={Success} alt=""  className="w-[400px] m-auto"/>
          <h1 className="font-bold text-2xl">Cám ơn bạn đã đặt hàng!</h1>
          <p className="my-2">Đơn hàng đã hoàn tất!</p>
          <span>Cám ơn bạn vì đã tin tưởng  và lựa chọn sản phẩm của chúng tôi</span>
          <button className="block m-auto p-2 bg-blue-600 text-white rounded hover:opacity-50"><Link to="/">Về Trang Chủ</Link></button>
        </div>
        <div className="grid grid-cols-2 gap-8 my-4 ">
            <div className="p-2 w-[400px] min-h-[250px] border-2 border-solid border-black">
              <h1 className="text-xl font-bold">Chi tiết đơn hàng</h1>
              <table className="w-full">
                <tr className="my-4">
                  <td className="text-left font-bold">Sản phẩm</td>
                  {data && data.products.map((product: any) => (
                    <td className="text-right">
                      <p>{product.name}</p>
                    </td>
                  ))}
                </tr>
                <tr className="my-4">
                  <td className="text-left font-bold">Số tiền:</td>
                  <td className="text-right">{calculateTotal()}$</td>
                </tr>
                <tr className="my-4">
                  <td className="text-left font-bold">Phí vận chuyển:</td>
                  <td className="text-right">{shipped}$</td>
                  </tr>
                {/* <tr className="my-4">
                  <td className="text-left font-bold">Phương thức thanh toán:  </td>
                  {data && data.products.map((product: any) => (
                    <td className="text-right">
                      <p>{product.payment}</p>
                    </td>
                  ))}
                </tr> */}
                
              </table>
            <p className="border-t-2 border-solid border-gray mt-4 text-left "><strong>Tổng cộng:</strong> {calculateTotal()  + shipped}$ </p>
            </div>
           

        </div>
      </div>
    </div>
  )
}

export default OrderSuccess

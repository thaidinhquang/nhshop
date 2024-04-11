import useCart from "@/common/hooks/useCart";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { IProduct } from "@/common/types/product";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Banner from "../home/_component/Banner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const OrderPage = () => {
    const form = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const navigate = useNavigate();
    const { data, calculateTotal, getPayment } = useCart();
    
    const [selectedPayment, setSelectedPayment] = useState(""); // State để lưu trữ giá trị của radio button

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value); // Cập nhật state khi người dùng chọn radio button
    };

    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await axios.post(
                "http://localhost:8080/api/v1/orders",
                order,
            );
            return data;
        },
        onSuccess: () => {
            navigate("/success")
            alert("Đặt hàng thành công");
        },
    });

    const onSubmit = (formData: object) => {
     
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
            payment: selectedPayment,
        });
    };
    return (
       <div className="">
        <Banner />
         <div className="container mx-auto">
            <h2 className="section-heading__title mb-4">Order</h2>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tên"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Số điện thoại"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Email của bạn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Địa chỉ"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           
                            <Button type="submit">Đặt Hàng</Button>
                        </form>
                    </Form>
                </div>
               
            <div className=" col-span-4">
          <div className="Billing-Submit-infor">
            <table className="table">
              <tr>
                <th className="product_title"><h3>Product</h3></th>
                <th className="subtotal_title"><h3>Subtotal</h3></th>
              </tr>
              {data?.products.map((item: any) => (

              <tr>
                <td className="product_title_detail">
                  <p className="product_title_detail_sofa">
                    {item.name}<span className="quantity"> x {item.quantity}</span>
                  </p>
                </td>
                <td className="subtotal_title_detail"><p>{item.price * item.quantity}$</p></td>
              </tr>
              ))}
              <tr>
                <td className="product_title_detail"><p>Subtotal</p></td>
                <td className="subtotal_title_detail"><p>{calculateTotal()}$</p></td>
              </tr>
              <tr>
                <td className="product_title_detail"><p>Total</p></td>
                <td className="subtotal_title_detail">
                  <p className="subtotal_title_detail_total">{calculateTotal()}$</p>
                </td>
              </tr>
            </table>
          </div>
          <hr />
          
          <div className="select-item1">
            <input id="bank" type="radio" name="paymentMethod" value="Direct Bank Transfer"   /><span
              className="service-item1-radio-first"
              
              >Direct Bank Transfer</span>
            
          </div>
          <div className="select-item1-box">
            <span className="select-item1-text">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </span>
          </div>
          <div className="select-item1">
            <input id="bank" type="radio" name="paymentMethod" value="Direct Bank Transfer" defaultChecked /><span
              className="Direct_Bank_Transfer"
              >Direct Bank Transfer</span>
          </div>
          <div className="select-item1">
            <input type="radio" name="paymentMethod" value="Cash On Delivery" /><span
              className="Direct_Bank_Transfer"
              >Cash On Delivery</span>
          </div>
          <div className="select-item1-box2">
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <strong>privacy policy.</strong>
            </p>
          </div>
          {/* <div className="flex_button">
            <button className="button"><p>Place order</p></button>
          </div> */}
        </div>
            </div>
        </div>
       </div>
    );
};

export default OrderPage;

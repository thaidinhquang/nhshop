import { useEffect, useState } from "react";
import { ICart } from "../interface/ICart";

const Checkout = () => {
    const [cartData, setCartData] = useState<ICart[] | null>(null);
    const [orderFormData, setOrderFormData] = useState({
        name: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        const data = localStorage.getItem('cartData');
        if (data) {
            setCartData(JSON.parse(data));          
        }
    }, []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Xử lý dữ liệu đơn hàng ở đây, ví dụ: gửi đến API hoặc lưu vào cơ sở dữ liệu
        console.log("Order submitted:", orderFormData);
        // Sau khi xử lý xong, có thể redirect hoặc làm gì đó khác
    };

    return (
        <div>
            {cartData && (
                <div>
                    <h2>Thông tin giỏ hàng</h2>
                    <ul>
                        {cartData.map((item: ICart, index: number) => (
                            <li key={index}>
                                <p>ID: {item.id}</p>
                                <p>Product: {item.product}</p>
                                <p>Quantity: {item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                    {/* Hiển thị tổng giá trị đơn hàng */}
                    <h2>Đặt hàng</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Tên:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={orderFormData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={orderFormData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Địa chỉ:</label>
                            <textarea
                                id="address"
                                name="address"
                                value={orderFormData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Đặt hàng</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Checkout;

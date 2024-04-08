import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import React from 'react';
// import { IProduct } from '../../interface/IProduct';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartMutation } from "../../hooks/useHookMutation";
import { ICart } from "../../interface/ICart";
import { IProduct } from "../../interface/IProduct";
import { toast } from "sonner";
import { useCartQuery } from "../../hooks/useHookQuery";

const Detail = () => {
  const { mutate: addToCart, isPending: isAddpPending } = useCartMutation(
    "CREATE",
    "Add to cart successfully"
  );
  const { mutate: updateCart, isPending: isUpdatePending } = useCartMutation(
    "UPDATE",
    "Update cart successfully"
  );
  const [timer, setTimer] = useState(0);
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      return data;
    },
  });
  const { data: listCart, refetch } = useCartQuery(0);
  const handleAddToCart = (product: IProduct) => {
    if (timer > 0) {
      toast.error("Too fast, try again latter");
      console.log(timer);
    } else {
      setTimer(1);
      const cart = listCart.find((item: ICart) => item.product === product.id);
      if (cart) {
        updateCart({ ...cart, quantity: cart.quantity + 1 });
        setTimer(1);
      } else {
        addToCart({ product: product.id!, quantity: 1 });
      }
      refetch();
      refetch();
      setTimeout(() => {
        setTimer(0);
      }, 3000);
    }
  };

  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    const fetchCategoryName = async () => {
      // Thực hiện lấy tên danh mục dựa trên categoryID
      const response = await axios.get(
        `http://localhost:3000/category/${data.categoryID}`
      );
      setCategoryName(response.data.name);
    };

    if (data) {
      fetchCategoryName();
    }
  }, [data]);

  // Kiểm tra nếu dữ liệu đang được tải
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Kiểm tra nếu có lỗi khi tải dữ liệu
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
     <section className="nav-bar">
                <div className="container">
                    <ul className="nav-bar-deltail">
                        <li className="nav-bar-item"><Link to={"/"} className="nav-bar-link">Home</Link></li>
                        <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        <li className="nav-bar-item"><Link to={"/shop"} className="nav-bar-link">Shop</Link></li>
                        <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                        <li className="nav-bar-item nav-bar-link1">{data.title}</li>
                        <li>
                            {data.name}
                        </li>
                    </ul>
                </div>
            </section>
      {/* {data?.map((item:IProduct,index:number)=>( */}

      <section className="product-detail">
        <div className="container">
          <div className="product-detail_inner">
            <div className="product-detail_media">
              <div className="product-detail_media_slide">
                <div>
                  <img src="https://picsum.photos/200/300" alt="" />
                </div>
                {/* <div>
                        <img src="https://picsum.photos/id/1/200/100" alt="" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/id/2/200/100" alt="" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/id/3/200/100" alt="" />
                    </div> */}
              </div>
              <div className="product-detail_media_thumbnail">
                <div className="product-detail_media_thumbnail__bg">
                  <img src={data.image} alt="" width={300} />
                </div>
              </div>
            </div>
            <div className="product-detail_content">
              {/* Nội dung chi tiết sản phẩm */}
              <div className="detail_content">
                <h2>{data.name}</h2>
                <div className="detail-evaluate">
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#FFD43B"
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#FFD43B"
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#FFD43B"
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#FFD43B"
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <svg
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#FFD43B"
                      d="M288 0c-12.2 .1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zM429.9 512c1.1 .1 2.1 .1 3.2 0h-3.2z"
                    />
                  </svg>
                </div>
                <span>Price: {data.price}</span>
                <div className="detail_content__star">
                  <div className="star_fill"></div>
                </div>
                <p>{data.description}</p>

                <div className="detail_content__color">
                  <span>Color</span>
                  <div className="detail_content__color__btn">
                    <button className="violet"></button>
                    <button className="black"></button>
                    <button className="brown"></button>
                  </div>
                </div>
                <div className="detail-listtocart">
                  <button className="slots">
                    <span className="remove">-</span>
                    <span className="slot">1</span>
                    <span className="add">+</span>
                  </button>
                  <button className="detail-addtocarts">Add To Cart</button>
                  {/* <button className="detail-compare">Compare</button> */}
                </div>
                <div className="handle"></div>
                <div className="detail-product-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>SKU</th>
                                            <td>:</td>
                                            <td className="itemss">SS001</td>
                                        </tr>
                                        <tr>
                                            <th>Category</th>
                                            <td>:</td>
                                            <td className="itemss capitalize">{data. categoryID}</td>
                                        </tr>
                                        <tr>
                                            <th>Tags</th>
                                            <td>:</td>
                                            <td className="itemss">Sofa, Chair, Home, Shop</td>
                                        </tr>
                                        <tr>
                                            <th>Share</th>
                                            <td>:</td>
                                            <td className="icon items-center">
                                                <svg className="w-5 self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
                                                <svg className="w-5 self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>
                                                <svg className="w-5 self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-description">
        <div className="container">
          <div className="product-description_inner">
            <div className="product-description_title">
              <h2 className="active">Description</h2>
              <h2>Additional Information</h2>
              <h2>Reviews [5]</h2>
            </div>
            <div className="product-description_content">
              <p>{data.description}</p>
            </div>
            <div className="product-description_media">
              {/* Hình ảnh thêm */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;

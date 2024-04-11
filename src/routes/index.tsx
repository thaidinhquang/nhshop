import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAdd from "@/pages/(dashboard)/product/_components/add";
import ProductEditPage from "@/pages/(dashboard)/product/_components/edit";
import ProductManagement from "@/pages/(dashboard)/product/page";
import Signin from "@/pages/(website)/(auth)/Signin";
import NotFound from "@/pages/(website)/404/page";
import AboutPage from "@/pages/(website)/about/page";
import CartPage from "@/pages/(website)/cart/page";
import ContactPage from "@/pages/(website)/contact/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import CategoryDetail from "@/pages/(website)/product/category/detail/page";
import DetailProduct from "@/pages/(website)/product/detail/page";
import ShopPage from "@/pages/(website)/product/page";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "@/pages/(website)/order/page";
import Signup from "@/pages/(website)/(auth)/Signup";
import CategoryManagement from "@/pages/(dashboard)/category/page";
import CategoryAdd from "@/pages/(dashboard)/category/_components/add";
import EditCategory from "@/pages/(dashboard)/category/_components/edit";
import OrderSuccess from "@/pages/(website)/order/oderSuccess";
import UserPanagement from "@/pages/(dashboard)/user/page";
import ProductEdit from "@/pages/(dashboard)/product/_components/edit";
import OrderList from "@/pages/(dashboard)/order/_component/list";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="products/:id" element={<DetailProduct />} />
                    <Route path="categories/:id" element={<CategoryDetail />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="success" element={<OrderSuccess />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
                <Route
                    path="admin"
                    element={
                        <PrivateRoute>
                            <LayoutAdmin />
                        </PrivateRoute>
                    }
                >
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="products/add" element={<ProductAdd />} />
                    <Route
                        path="products/edit/:id"
                        element={<ProductEdit />}
                    />
                    <Route path="category" element={<CategoryManagement />} />
                    <Route path="category/add" element={<CategoryAdd />} />
                    <Route path="category/edit/:id" element={<EditCategory/>} />
                    <Route path="user" element={<UserPanagement />} />

                    <Route path="order" element={<OrderList/>} />

                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Router;

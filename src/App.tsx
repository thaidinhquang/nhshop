import { Route, Routes } from 'react-router-dom'
import HomePage from './component/pages/Home'
import DetailPage from './component/pages/DetailPage'
import ShopPage from './component/pages/Shop'
import CartPage from './component/pages/Cart'
import Layout from './component/pages/Layout'
import LayoutAdmin from './component/pages/admin/LayoutAdmin'
import ProductList from './component/pages/admin/product/ProductList'
import CheckOut from './component/pages/CheckOut'
import ProductAdd from './component/pages/admin/product/ProductAdd'
import ProductEdit from './component/pages/admin/product/ProductEdit'
import CategoryEdit from './component/pages/admin/category/CategoryEdit'
import CategoryAdd from './component/pages/admin/category/CategoryAdd'
import CategoryList from './component/pages/admin/category/CategoryList'
import UserList from './component/pages/admin/user/UserList'
import UserAdd from './component/pages/admin/user/UserAdd'
import UserEdit from './component/pages/admin/user/UserEdit'
import DashBoard from './component/pages/admin/DashBoard'
import NotFound from './component/pages/NotFound'
import LoginPage from './component/pages/LoginPage/LoginPage'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import SignupForm from './component/pages/LoginPage/SignupForm'

function App() {
  return (
    <>
      <ToastContainer limit={1} newestOnTop={true} />
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='' element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='detail/:id' element={<DetailPage />} />
          <Route path='checkout' element={<CheckOut />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<SignupForm />} />
        </Route>
        <Route path='admin' element={<LayoutAdmin />} >
          <Route path='' element={<DashBoard />} />
          <Route path='products'>
            <Route path='' element={<ProductList />} />
            {/* <Route path=':trash' element={<ProductList />} /> */}
            <Route path='add' element={<ProductAdd />} />
            <Route path=':id/edit' element={<ProductEdit />} />
          </Route>
          <Route path='category'>
            <Route path='' element={<CategoryList />} />
            <Route path=':trash' element={<CategoryList />} />
            <Route path='add' element={<CategoryAdd />} />
            <Route path=':id/edit' element={<CategoryEdit />} />
          </Route>
          <Route path='users'>
            <Route path='' element={<UserList />} />
            <Route path='add' element={<UserAdd />} />
            <Route path=':id/edit' element={<UserEdit />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

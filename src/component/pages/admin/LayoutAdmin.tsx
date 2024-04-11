import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContextProvider"

const LayoutAdmin = () => {
    const location = useLocation().pathname.split("/")[2]
    const { user, removeCurrentID } = useContext(UserContext)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [confirm, setConfirm] = useState(false)
    useEffect(() => {
        if (!user || !user.active || user.role < 1) {
            navigate('/')
        }
    }, [user, navigate])
    useEffect(() => {
        if (open == false) {
            setConfirm(false)
        }
    }, [open])
    const onLogOut = () => {
        if (!confirm) {
            setConfirm(true)
            return
        }
        setOpen(false)
        removeCurrentID()
        navigate('/')
    }
    return (
        <div className="border-orange-400">
            <div className="p-4 border-gray-300 border-b-[1px] flex justify-between relative">
                <h1 className="self-center text-lg font-bold">Dinh Quang Thai</h1>
                <button onClick={onLogOut} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{"Logout"}</button>
                <button onClick={() => setOpen(!open)}>
                </button>
                <div className={`absolute font-[segoe script] shadow-md bg-white right-0 top-10 rounded-md w-[200px] mt-4 p-4 rounded-xl ${!open && "hidden"}`}>
                    <div className="flex justify-center border-gray-400 border-b-[1px] pb-3 mb-2">
                        <div className="flex items-center gap-2">
                            <img src={user?.image} className="w-8 rounded-3xl" />
                            <h2 className="text-lg text-black">{user?.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[10%,1fr]">
                <div className="bg-gray border-gray-300 ">
                    <h2 className="px-4 text-lg font-medium text-gray-500 mb-2 mt-6">Admin</h2>
                    <Link to={'/admin/category'} className={`px-4 py-3 flex gap-1 place-items-center text-gray-500 ${location == "category" && "bg-gray-100"}`}>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M326.3 218.8c0 20.5-16.7 37.2-37.2 37.2h-70.3v-74.4h70.3c20.5 0 37.2 16.7 37.2 37.2zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-128.1-37.2c0-47.9-38.9-86.8-86.8-86.8H169.2v248h49.6v-74.4h70.3c47.9 0 86.8-38.9 86.8-86.8z"/></svg>
                        <h3>Category</h3>
                    </Link>
                    <Link to={'/admin/products'} className={`px-4 py-3 flex gap-1 place-items-center text-gray-500 ${location == "products" && "bg-gray-100"}`}>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z"/></svg>
                        <h3>Product</h3>
                    </Link>
                    <Link to={'/admin/users'} className={`px-4 py-3 flex gap-1 place-items-center text-gray-500 ${location == "users" && "bg-gray-100"}`}>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                        <h3>User</h3>
                    </Link>
                </div>
                <div className="p-6 bg-gray-100">
                    <div className="h-screen bg-white p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
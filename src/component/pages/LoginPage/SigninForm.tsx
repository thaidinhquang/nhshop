import { ChangeEvent, useContext, useState } from "react";
import useHookQuery from "../../hooks/useHookQuery";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
import { Toaster, toast } from "sonner";
type IForm = {
  email: string;
  password: string;
}
const SigninForm = () => {
  const { data, isLoading } = useHookQuery({ path: 'users', active: true })
  const { setCurrentID } = useContext(UserContext)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = data?.find((item: IForm) => item.email === loginForm.email && item.password === loginForm.password)
    if (user) {
      toast.success('đăng nhập thành công!')
      setCurrentID(user.id)
    } else {
      toast.error('đăng nhập thất bại!')
    }
  }
  if (isLoading) return <div>Loading...</div>
  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <Toaster richColors position='bottom-left' duration={2000} expand={true} />
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Welcome back!
              </h1>
              <form className="mt-12" onSubmit={onSubmit}>
                <div className="relative">
                  <input
                    id="signin-email"
                    name="email"
                    type="text"
                    onChange={onHandleChange}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    onChange={onHandleChange}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                <input
                  type="submit"
                  value="Sign in"
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                />
              </form>
              <Link to="/forgot-password" className="mt-4 block text-sm text-center font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {" "}Forgot your password?{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
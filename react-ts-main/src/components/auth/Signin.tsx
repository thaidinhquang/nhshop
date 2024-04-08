import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
 // Import useLocalStorage hook
import { IUser } from "../../interface/IUser";
import { useLocalStorage } from "../../hooks/useStorage";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [, setCurrentID] = useLocalStorage('currentID', ""); 
  const { mutate, isPending } = useMutation({
    mutationFn: async (user: IUser) => {
      const { data } = await axios.post(
        `http://localhost:3000/signin`,user
      );
      return data;
    },
    onSuccess: (user:IUser) => {
      setCurrentID(user.id); 
      navigate("/");
    },
  });
  const onSubmit = (user: IUser) => {
    mutate(user);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Chào mừng bạn đến với trang đăng nhập</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Đưa thông tin  tài khoản vào và đăng nhập ngay</p>
            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more 
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
        <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in
                </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="dinhquangthai@gmail.com"
              />
              {errors.email && <span>không được để trống</span>}
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.password && <span>không được để trống</span>}
            </div>
            
            

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >           
              {isPending ? "Đang Thêm..." : "Thêm"}
           
            </button>
            <div className="text-sm font-medium text-gray-900 dark:text-white"><Link to={"/signup"}>
                        Not registered yet? <a className="text-blue-600 hover:underline dark:text-blue-500">Create account</a></Link>
                    </div>
          </form>
          </div>
        </div>
    </div>
</section>
  );
};

export default Signup;
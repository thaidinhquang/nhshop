import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ICategory } from "../../../interface/ICategory";
import { useNavigate } from "react-router-dom";

const CategoryAdd = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    defaultValues:{
      name:"",
      image: ""
    }
  });

  const navigate = useNavigate();

  const {mutate ,isPending}=useMutation({
    mutationFn:async(product:ICategory)=>{
      const {data} = await axios.post(`http://localhost:3000/category`,product)
      return data
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["CATEGORY"]
      })
    }
  })
  const onSubmit = (category:ICategory) => {
    mutate(category);
    navigate("/admin/category")
  };
  return (
   <div className="p-4 sm:ml-64">
      <div className='container'>
      <h1 className='text-center font-bold text-2xl'>Product-Add</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("name", { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Tên Sản Phẩm
              </label>
              {errors.name && <span>không được để trống</span>}
              {/* <input
                {...register("image", { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Image
              </label>
              {errors.image && <span>không được để trống</span>} */}
            </div>

           
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">{isPending?"Đang Thêm...":"Add"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;


import { useCategoryQuery } from "@/common/hooks/useCategoryQuery";
import { ICategory } from "@/common/types/category";
import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { editProduct } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";


const ProductEdit = () => {
    const queryClient = useQueryClient();
    const {data: categories} = useCategoryQuery();
    const { id } = useParams();
  const { 
    register,
    handleSubmit,
    formState: {errors},
    reset
    } = useForm({
        defaultValues: {
            name: "",
            price: 0,
            category: "",
            image: "",
            description: "",
            discount: 0,
            featured: false,
            countInStock: 0,
        },
    });  
    const navigate = useNavigate()
    useQuery({
        queryKey: ['PRODUCT_KEY', id],
        queryFn: async () => {
            const res =  await instance.get(`/products/${id}`)
            reset(res.data)
            return res.data
        }
    })
    const {mutate} = useMutation({
        mutationFn: async (product: IProduct) => {
            const { data } = await editProduct(product);
            return data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['PRODUCT_KEY']
        })
          alert('Cập nhật thành công !');
          navigate('/admin/products')
        },
    });

    const onSubmit = (data: any) => {
        mutate(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select {...register('category', {required: true})} className='w-full my-4 border-[1px] border-solid border-[#ccc]'>
                <option value="">--- Chọn danh mục ---</option>
                {categories && categories.map((item: ICategory, index: number) => (
                    <option key={index} value={item._id}>{item.name}</option>
                ))}
                </select>
                <div className="my-4">
                    <label htmlFor="" className='block '>Name</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('name', {required: true, minLength: 3})} />
                    {errors?.name && <p className='text-[red]'>Name is required</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Price</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="number" {...register('price', {required: true, minLength: 0})} />
                    {errors?.price && <p className='text-[red]'>Price is required</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Image</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('image', {required: true, minLength: 3})} />
                    {errors?.image && <p className='text-[red]'>Image is required</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Quantity</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('countInStock', {required: true, minLength: 0})} />
                    {errors?.countInStock && <p className='text-[red]'>Quantity is required</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Discount</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('discount', {required: true, minLength: 0})} />
                    {errors?.discount && <p className='text-[red]'>Discount is required</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Description</label>
                    <textarea className='w-full pl-2  border-[1px] border-solid border-[#ccc]' cols={30} rows={10}  {...register('description', {required: true, minLength: 3})} />
                    {errors?.description && <p className='text-[red]'>Description is required</p>}
                </div>
                <div className="my-4">
                    <button className="p-2 bg-blue-500 rounded text-white hover:opacity-50">Update Product</button>
                </div>
            </form>
        </div>
    )
};

export default ProductEdit;

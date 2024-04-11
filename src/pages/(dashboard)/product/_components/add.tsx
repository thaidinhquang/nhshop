
import { useCategoryQuery } from "@/common/hooks/useCategoryQuery";
import { ICategory } from "@/common/types/category";
import { IProduct } from "@/common/types/product";
import { addProduct } from "@/services/product";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string(),
    // gallery: Joi.array().items(Joi.string()),
    image: Joi.string(),
    description: Joi.string(),
    discount: Joi.number().min(0),
    featured: Joi.boolean(),
    countInStock: Joi.number().min(0),
});

const ProductAdd = () => {
    const queryClient = useQueryClient();
    const {data: categories} = useCategoryQuery();
  const { 
    register,
    handleSubmit,
    formState: {errors},

    } = useForm({
        resolver: joiResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            category: "",
            // gallery: [],
            image: "",
            description: "",
            discount: 0,
            featured: false,
            countInStock: 0,
        },
    });  
    const navigate = useNavigate()
    const {mutate} = useMutation({
        mutationFn: async (product: IProduct) => {
            const { data } = await addProduct(product);
            return data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['PRODUCT_KEY']
        })
          alert('Thêm thành công !');
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
                    {errors?.name && <p className='text-[red]'>{errors.name.message}</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Price</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="number" {...register('price', {required: true, minLength: 0})} />
                    {errors?.price && <p className='text-[red]'>{errors.price.message}</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Image</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('image', {required: true, minLength: 3})} />
                    {errors?.image && <p className='text-[red]'>{errors.image.message}</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Quantity</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('countInStock', {required: true, minLength: 0})} />
                    {errors?.countInStock && <p className='text-[red]'>{errors.countInStock.message}</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Discount</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('discount', {required: true, minLength: 0})} />
                    {errors?.discount && <p className='text-[red]'>{errors.discount.message}</p>}
                </div>
                <div className="my-4">
                    <label htmlFor="" className='block '>Description</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('description', {required: true, minLength: 3})} />
                    {errors?.description && <p className='text-[red]'>{errors.description.message}</p>}
                </div>
                <div className="my-4">
                    <button className="p-2 bg-blue-500 rounded text-white hover:opacity-50">Add Product</button>
                </div>
            </form>
        </div>
    )
};

export default ProductAdd;

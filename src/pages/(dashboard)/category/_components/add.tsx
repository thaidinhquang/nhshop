
import { ICategory } from "@/common/types/category";
import { addCategory } from "@/services/category";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const categorySchema = Joi.object({
    name: Joi.string().required(),
});

const CategoryAdd = () => {
    const queryClient = useQueryClient();
  const { 
    register,
    handleSubmit,
    formState: {errors},
    } = useForm({
        resolver: joiResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    });  
    const navigate = useNavigate()
    const {mutate} = useMutation({
        mutationFn: async (category: ICategory) => {
            const { data } = await addCategory(category);
            return data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['CATEGORY_KEY']
        })
          alert('Thêm thành công !');
          navigate('/admin/category')
        },
    });

    const onSubmit = (data: any) => {
        mutate(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
             
                <div className="my-4">
                    <label htmlFor="" className='block '>Name</label>
                    <input className='w-full pl-2 h-[50px] border-[1px] border-solid border-[#ccc]' type="text" {...register('name', {required: true, minLength: 3})} />
                    {errors?.name && <p className='text-[red]'>{errors.name.message}</p>}
                </div>
                <div className="my-4">
                    <button className="p-2 bg-blue-500 rounded text-white hover:opacity-50">Add Category</button>
                </div>
            </form>
        </div>
    )
};

export default CategoryAdd;

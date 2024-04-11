
import { ICategory } from "@/common/types/category";
import instance from "@/configs/axios";
import { editCategory } from "@/services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";


const EditCategory = () => {
  const queryClient = useQueryClient();
  const { id } = useParams()
  const { 
    register,
    handleSubmit,
    formState: {errors},
    reset
    } = useForm({
        defaultValues: {
            name: "",
        },
    });  
    const navigate = useNavigate()
    useQuery({
      queryKey: ['CATEGORY_KEY', id],
      queryFn: async () => {
        const {data} = await instance.get(`/categories/${id}`);
        reset({
            _id: data.category._id,
          name: data.category.name,
        });       
         return data
      }
    })
    const {mutate} = useMutation({
        mutationFn: async (category: ICategory) => {
            const { data } = await editCategory(category);
            return data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['CATEGORY_KEY']
        })
          alert('Cập nhật thành công !');
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
                    {errors?.name && <p className='text-[red]'>Name is reqired</p>}
                </div>
                <div className="my-4">
                    <button className="p-2 bg-blue-500 rounded text-white hover:opacity-50">Update Category</button>
                </div>
            </form>
        </div>
    )
};

export default EditCategory;

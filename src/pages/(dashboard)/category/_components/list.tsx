import { useCategoryQuery } from '@/common/hooks/useCategoryQuery';
import { deleteCategory } from '@/services/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const queryClient = useQueryClient();
    const { data: categories } = useCategoryQuery();

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
           if(confirm('Bạn có muốn xóa ?')){
                return await deleteCategory(id);
           }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CATEGORY_KEY']
            });
        }
    });
   
    return (
        <div>
            <div className="container">
                <div className="flex justify-between my-2">
                    <div className="">
                        <h1 className='text-2xl'>Category List</h1>
                    </div>
                    <div className="">
                        <button className='p-2 bg-black text-white rounded'><Link to='/admin/category/add'>Add Category</Link></button>
                    </div>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='border border-solid border-gray p-2'>Name</th>
                            <th className='border border-solid border-gray p-2'>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(categories) && categories.map((item, index) => (
                            <tr key={index}>
                                <td className='text-center border border-solid border-gray p-2'>{item.name}</td>
                                <td className='text-center border border-solid border-gray p-2'>
                                    <button className='w-[80px] bg-red-700 text-white rounded hover:opacity-40' onClick={() => mutate(item._id)}>Delete</button>
                                    <button className='ml-2 w-[80px] bg-yellow-700 text-white rounded hover:opacity-40'><Link to={`/admin/category/edit/${item._id}`}>Edit</Link></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;

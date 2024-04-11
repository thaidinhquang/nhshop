import { useUserQuery } from '@/common/hooks/useUserQuery';
import { deleteUser } from '@/services/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UserList = () => {
    const queryClient = useQueryClient();
    const { data: users } = useUserQuery();

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
           if(confirm('Bạn có muốn xóa ? ')){
                return await deleteUser(id);
           }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['USER_KEY']
            });
        }
    });
   
    return (
        <div>
            <div className="container">
                <div className="flex justify-between my-2">
                    <div className="">
                        <h1 className='text-2xl'>User List</h1>
                    </div>
                    <div className="">
                        {/* <button className='p-2 bg-black text-white rounded'><Link to='/admin/category/add'>Add Category</Link></button> */}
                    </div>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='border border-solid border-gray p-2'>Name</th>
                            <th className='border border-solid border-gray p-2'>Email</th>
                            <th className='border border-solid border-gray p-2'>Password</th>
                            <th className='border border-solid border-gray p-2'>Role</th>
                            <th className='border border-solid border-gray p-2'>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.map((item, index) => (
                            <tr key={index}>
                                <td className='text-center border border-solid border-gray p-2'>{item.name}</td>
                                <td className='text-center border border-solid border-gray p-2'>{item.email}</td>
                                <td className='text-center border border-solid border-gray p-2'>{item.password}</td>
                                <td className='text-center border border-solid border-gray p-2'>{item.role}</td>
                                <td className='text-center border border-solid border-gray p-2'>
                                    <button className='w-[80px] bg-red-700 text-white rounded hover:opacity-40' onClick={() => mutate(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;

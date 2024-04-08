import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../../../interface/IUser';

const UserList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['USER'],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/users`);
      return data;
    }
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number | string) => {
      if (window.confirm('Are you sure you want to delete this category')) {
        await axios.delete(`http://localhost:3000/users/${id}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["USER"]
      });
    }
  });

  const roleMapping: { [key: number]: string } = {
    1: "Admin",
    2: "User"
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="p-4 sm:ml-64">
    <div className='container'>
          <h1 className='text-center font-bold text-2xl'>User-List</h1>
          <Link to={`add`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</Link>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-8">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Admin/User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: IUser, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{roleMapping[item.role]}</td>
                  <td>
                    <button className="font-mono text-red-600 dark:text-red-500 hover:underline px-2.5" onClick={() => mutate(item.id!)}>Remove</button>
                    <Link to={`edit/${item.id}`}><button className="font-mono text-blue-600 dark:text-blue-500 hover:underline ml-2">Edit</button></Link>
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

import React from 'react';
import { useProductQuery } from '@/common/hooks/useProductQuery';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '@/services/product';

const ProductList = () => {
    const queryClient = useQueryClient();
    const { data } = useProductQuery();
    const products = data?.data; // Kiểm tra xem data có tồn tại không trước khi truy cập vào data.data

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            if(confirm('Bạn có muốn xóa ?')) {

                return await deleteProduct(id);
            } 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT_KEY']
            });
        }
    });
   
    return (
        <div>
            <div className="container">
                <div className="flex justify-between my-2">
                    <div className="">
                        <h1 className='text-2xl'>Product List</h1>
                    </div>
                    <div className="">
                        <button className='p-2 bg-black text-white rounded'><Link to='/admin/products/add'>Add Product</Link></button>
                    </div>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='border border-solid border-gray p-2'>Product</th>
                            <th className='border border-solid border-gray p-2'>Name</th>
                            <th className='border border-solid border-gray p-2'>Category</th>
                            <th className='border border-solid border-gray p-2'>Price</th>
                            <th className='border border-solid border-gray p-2'>Quantity</th>
                            <th className='border border-solid border-gray p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.map((item, index) => (
                            <tr key={index}>
                                <td className='border border-solid border-gray p-2 text-center'><img src={item.image} alt={item.name} className='w-[50%] m-auto rounded-full' /></td>
                                <td className='border border-solid border-gray p-2 text-center'>{item.name}</td>
                                <td className='border border-solid border-gray p-2 text-center'>{item.category}</td>
                                <td className='border border-solid border-gray p-2 text-center'>{item.price}$</td>
                                <td className='border border-solid border-gray p-2 text-center'>{item.countInStock}</td>
                                <td className='border border-solid border-gray p-2 text-center'>
                                    <button onClick={() => mutate(item._id)} className='w-[80px] h-[40px] bg-red-700 text-white hover:opacity-50 rounded'>Delete</button>
                                    <button className='w-[80px] h-[40px] bg-yellow-700 text-white hover:opacity-50 rounded'><Link to={`/admin/products/edit/${item._id}`}>Edit</Link></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;

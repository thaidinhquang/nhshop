import React, { useState } from 'react';
import useCart from '@/common/hooks/useCart';
import { useOrderQuery } from '@/common/hooks/useOrderQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const queryClient = useQueryClient();
    const { data: orders } = useOrderQuery();
    const { data, calculateTotalProducts } = useCart();
    const [selectedStatus, setSelectedStatus] = useState('');

    const { mutate } = useMutation({
        mutationFn: async (id: number, status: string) => {
            await axios.put(`/orders/${id}`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ORDER_KEY']
            });
        }
    });

    const handleStatusChange = (event: any) => {
        setSelectedStatus(event.target.value);
    };

    const updateOrderStatus = (id: number) => {
        mutate(id, selectedStatus);
    };

    const status = (n: any) => {
        switch (n) {
            case '0':
                return 'Pending';
            case '1':
                return 'Confirmed';
            case '2':
                return 'Shipped';
            case '3':
                return 'Delivered';
            case '4':
                return 'Cancelled';
            default:
                return 'Pending';
        }
    };

    return (
        <div>
            <div className="container">
                <div className="flex justify-between my-2">
                    <div className="">
                        <h1 className='text-2xl'>Order List</h1>
                    </div>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='border border-solid border-gray p-2'>STT</th>
                            <th className='border border-solid border-gray p-2'>Name</th>
                            <th className='border border-solid border-gray p-2'>Email</th>
                            <th className='border border-solid border-gray p-2'>Total</th>
                            <th className='border border-solid border-gray p-2'>Status</th>
                            <th className='border border-solid border-gray p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orders) && orders.map((item, index) => (
                            <tr key={index}>
                                <td className='text-center border border-solid border-gray p-2'>{index + 1}</td>
                                <td className='text-center border border-solid border-gray p-2'>{item.customerInfo.name}</td>
                                <td className='text-center border border-solid border-gray p-2'>{item.customerInfo.email}</td>
                                <td className='text-center border border-solid border-gray p-2'>{item.totalPrice}$</td>
                                <td className='text-center border border-solid border-gray p-2'>
                                    <select onChange={handleStatusChange}>
                                        <option value="0">{status('0')}</option>
                                        <option value="1">{status('1')}</option>
                                        <option value="2">{status('2')}</option>
                                        <option value="3">{status('3')}</option>
                                        <option value="4">{status('4')}</option>
                                    </select>
                                </td>
                                <td className='text-center border border-solid border-gray p-2'>
                                    <button className='ml-2 w-[80px] bg-yellow-700 text-white rounded hover:opacity-40'>Chi tiết</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderList;

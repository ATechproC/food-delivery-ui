import React, { useState } from 'react'
import Menu from '../components/AdminMenu'
import AdminMenu from '../components/AdminMenu';

const AdminOrders = () => {

    const status = [
        {
            id: 1,
            status: "pending",
            isSelected: false
        }, {
            id: 2,
            status: "completed",
            isSelected: false
        }, {
            id: 3,
            status: "all",
            isSelected: true
        }
    ]

    const [state, setState] = useState(status);

    const handleStatus = (id) => {
        const newArray = [...status];
        for (let i = 0; i < newArray.length; i++) {
            if (id == i + 1) {
                if (!newArray[i].isSelected) {
                    newArray[i].isSelected = !newArray[i].isSelected;
                }
            } else newArray[i].isSelected = false;
        }
        setState(newArray);
    }

    return <div className='flex gap-10'>
        <AdminMenu />
        <div className='m-3 w-full pr-5'>
            <div className='p-4'>
                <h2 className='font-bold text-[30px] py-3'>Order status</h2>
                <div className='flex flex-items gap-5'>
                    {
                        state.map(({ id, status, isSelected }) => <div
                            key={id} className='flex flex-items gap-2'>
                            <span onClick={() => handleStatus(id)}
                                style={{ backgroundColor: isSelected ? "#e91e63" : "" }}
                                className='w-[18px] h-[18px] rounded-full border-[2px] cursor-pointer' />
                            <p className='capitalize'> {status} </p>
                        </div>)
                    }
                </div>
            </div>
            <h2 className='text-[30px] font-bold pt-5'>All Orders</h2>
            <div className='w-full mt-6 flex flex-col'>
                <div className='flex-between border-[2px] p-3'>
                    <p className='font-bold text-[20px] w-full '>id</p>
                    <p className='font-bold text-[20px] w-full text-center'>image</p>
                    <p className='font-bold text-[20px] w-full text-center'>Customer</p>
                    <p className='font-bold text-[20px] w-full text-center'>Price</p>
                    <p className='font-bold text-[20px] w-full text-center'>Name</p>
                    <p className='font-bold text-[20px] w-full text-center'>ingredients</p>
                    <p className='font-bold text-[20px] w-full text-center'>status</p>
                </div>
                <div className='flex-between border-[2px] p-3 border-t-0'>
                    <p className='font-bold text-[20px] w-full '>id</p>
                    <p className='font-bold text-[20px] w-full text-center'>image</p>
                    <p className='font-bold text-[20px] w-full text-center'>Customer</p>
                    <p className='font-bold text-[20px] w-full text-center'>Price</p>
                    <p className='font-bold text-[20px] w-full text-center'>Name</p>
                    <p className='font-bold text-[20px] w-full text-center'>ingredients</p>
                    <p className='font-bold text-[20px] w-full text-center'>status</p>
                </div>
            </div>
        </div>
    </div>
}

export default AdminOrders
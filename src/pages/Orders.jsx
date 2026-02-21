import React from 'react'
import Profile from './Profile'
import { assets } from '../assets'

const Orders = () => {
    return (
        <>
            <Profile />
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 '>
                <h2 className='text-[30px] font-bold text-center '>My Orders</h2>
                <div className='relative bg-gray-900 w-[600px] p-5 rounded-md'>
                    <div className='flex flex-items gap-5'>
                        <div className='w-[80px] h-[80px] rounded-md overflow-hidden'>
                            <img
                                className='w-full h-full object-cover'
                                src={assets.meet3} draggable={false} />
                        </div>
                        <div>
                            <p className='text-[20px] font-semibold'>Chicken breast</p>
                            <p>$300</p>
                        </div>
                        <button className='button-style cursor-default bg-[#e91e63] text-white absolute right-4 top-1/2 -translate-y-1/2'>PENDING</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders
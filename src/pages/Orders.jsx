import React, { useContext, useEffect, useState } from 'react'
import Profile from './Profile'
import { assets } from '../assets'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../providers/AppProvider';

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const { backendUrl, jwt } = useContext(AppContext);

    const fetchUserOrders = async () => {
        try {

            const { data: { data } } = await axios.get(backendUrl + "/orders/user", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setOrders(data);

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUserOrders();
    }, []);

    return (
        <>
            <Profile />
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 '>
                <h2 className='text-[30px] font-bold text-center '>My Orders</h2>
                <div className=' w-[600px]'>
                    {
                        orders.map(item => {
                            return <div key={item.id} className='relative flex flex-items gap-5 mt-4  bg-gray-900 p-2 rounded-md'>
                                <div className='w-[80px] h-[80px] rounded-md overflow-hidden'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src={assets.meet3} draggable={false} />
                                </div>
                                <div>
                                    <p className='text-[20px] font-semibold'>Chicken breast</p>
                                    <p>${item.totalPrice} </p>
                                </div>
                                <button 
                                style={{backgroundColor : item.orderStatus === "PENDING" ? "purple" : item.orderStatus === "CONFIRMED" ? "green" : "red"}}
                                className='button-style cursor-default text-white absolute right-4 top-1/2 -translate-y-1/2'> {item.orderStatus} </button>
                            </div>
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default Orders
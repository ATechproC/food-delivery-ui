import React, { useContext, useEffect, useState } from 'react'
import AdminMenu from '../components/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../providers/AppProvider';
import UpdateStatusModel from '../components/UpdateStatusModel';
import { UpdateStatusContext } from '../providers/UpdateStatusProvider';

const AdminOrders = () => {

    const {isOpen, setIsOpen, setOrderId} = useContext(UpdateStatusContext);

    const status = [
        {
            id: 1,
            status: "ALL",
            isSelected: true
        }, {
            id: 2,
            status: "PENDING",
            isSelected: false
        }, {
            id: 3,
            status: "CONFIRMED",
            isSelected: false
        }, {
            id: 4,
            status: "CANCELLED",
            isSelected: false
        }
    ]

    const { backendUrl, jwt } = useContext(AppContext);

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

    // fetch restautant orders :

    const [orders, setOrders] = useState([]);

    const fetchRestaurantOrder = async (filterStatus) => {
        try {

            if (filterStatus === "ALL") {
                const { data: { data } } = await axios.get(backendUrl + "/orders/restaurant", {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                setOrders(data);
            }else {
                const { data: { data } } = await axios.get(backendUrl + "/orders/restaurant?status=" + filterStatus, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                setOrders(data);
            }

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchRestaurantOrder("ALL");
    }, []);

    // handle restaurant orders :

    return <div className='flex gap-10'>
        <AdminMenu />
        <UpdateStatusModel fetchRestaurantOrder={fetchRestaurantOrder} />
        <div className='m-3 w-full pr-5'>
            <div className='p-4'>
                <h2 className='font-bold text-[30px] py-3'>Order status</h2>
                <div className='flex flex-items gap-5'>
                    {
                        state.map(({ id, status, isSelected }) => <div
                            key={id} className='flex flex-items gap-2'>
                            <span onClick={() => {
                                fetchRestaurantOrder(status);
                                handleStatus(id);
                            }}
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
                {
                    orders.length > 0 && orders.map(item => {
                        return <div className='flex-between border-[2px] p-3 border-t-0'>
                            <p className='font-bold text-[20px] w-full '> {item.id} </p>
                            <p className='font-bold text-[20px] w-full text-center'>image</p>
                            <p className='font-bold text-[20px] w-full text-center'> {item.username} </p>
                            <p className='font-bold text-[20px] w-full text-center'> ${item.totalPrice} </p>
                            <p className='font-bold text-[20px] w-full text-center'> {item.name} </p>
                            <p className='font-bold text-[20px] w-full text-center'>ingredients</p>
                                <button
                                    style={{ backgroundColor: item.orderStatus === "CONFIRMED" ? "green" : item.orderStatus === "CANCELLED" ? "red" : "purple" }}
                                    onClick={() => {
                                        setIsOpen(!isOpen);
                                        setOrderId(item.id);
                                    }}
                                    className='rounded-md font-bold py-1 w-full text-center px-2'> {item.orderStatus} </button>
                            </div>
                    })
                }

            </div>
        </div>
    </div>
}

export default AdminOrders
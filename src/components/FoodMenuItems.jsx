import React, { useContext, useEffect } from 'react'
import { FoodContext } from '../providers/FoodProvider';
import { assets } from '../assets';
import AdminMenu from './AdminMenu';
import { MdDelete } from 'react-icons/md';
import { toast } from "react-toastify"
import axios from 'axios';
import { AppContext } from '../providers/AppProvider';

const FoodMenuItems = () => {

    const { foodItems, fetchFoodItems } = useContext(FoodContext);

    const { backendUrl, jwt } = useContext(AppContext);

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const setAvailability = async (id) => {
        try {

            await axios.put(backendUrl + "/food/update-availability/" + id, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            await fetchFoodItems();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }
    }

    const deleteFoodItem = async (id) => {
        try {

            await axios.delete(backendUrl + "/food/delete/" + id, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            await fetchFoodItems();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }
    }

    return <>
        <div className='flex gap-10'>
            <AdminMenu />
            <div className='w-full mt-6 flex flex-col'>
                <div className='flex-between border-[2px] p-2'>
                    <p className='font-bold text-[20px] w-full text-center'>imgae</p>
                    <p className='font-bold text-[20px] w-full text-center'>title</p>
                    <p className='font-bold text-[20px] w-full text-center'>ingredients</p>
                    <p className='font-bold text-[20px] w-full text-center'>Price</p>
                    <p className='font-bold text-[20px] w-full text-center'>Availability</p>
                    <p className='font-bold text-[20px] w-full text-center'>Delete</p>
                </div>
                {
                    (foodItems && foodItems.length) > 0 && foodItems.map((item, index) => {
                        return <div key={index}
                            className='flex-between border-[2px] p-2 border-t-0 py-4'>
                            <div className='font-bold text-[20px] w-full flex-center'>
                                <div className='w-[100px] h-[100px] rounded-md overflow-hidden'>
                                    <img className='w-full h-full object-cover' src={assets.meet1} draggable={false} />
                                </div>
                            </div>
                            <p className='font-bold text-[20px] w-full text-center capitalize'> {item.name} </p>
                            <p className='font-bold text-[20px] w-full text-center'>ingredients</p>
                            <p className='font-bold text-[20px] w-full text-center'>${item?.price} </p>
                            <button
                                onClick={() => setAvailability(item.id)}
                                style={{ backgroundColor: item.available ? "green" : "red" }}
                                className='font-bold text-[18px] w-full text-center p-1 rounded-md'>
                                {item.available ? "IN STOCK" : "OUT OF STOCK"}
                            </button>
                            <div className='font-bold text-[20px] w-full flex-center'>
                                <MdDelete
                                    onClick={() => deleteFoodItem(item.id)}
                                    color='red' size={25} cursor="pointer" />
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    </>
}

export default FoodMenuItems
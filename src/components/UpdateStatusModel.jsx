import React, { useContext } from 'react'
import { IoIosRadioButtonOff } from 'react-icons/io';
import { UpdateStatusContext } from '../providers/UpdateStatusProvider';
import { FaTimes } from 'react-icons/fa';
import { AppContext } from '../providers/AppProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateStatusModel = ({fetchRestaurantOrder}) => {

    const { isOpen, setIsOpen, orderId } = useContext(UpdateStatusContext);

    const { backendUrl, jwt} = useContext(AppContext);

    const updateOrderStatusHandler = async (id, status) => {
        try {

            await axios.put(backendUrl + `/orders/update-status/${id}?status=${status}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            await fetchRestaurantOrder("ALL");
            setIsOpen(!isOpen);

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return isOpen && <>
        <div onClick={() => setIsOpen(!isOpen)}
            className='fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur-[5px] transition duration-300' />
        <div className='fixed bg-gray-800 px-10 py-5 rounded-md flex flex-col gap-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <FaTimes
                onClick={() => setIsOpen(!isOpen)}
                className='absolute top-2 right-2 font-bold text-[15px] cursor-pointer' />
            <button onClick={() => updateOrderStatusHandler(orderId, "PENDING")}
                className='bg-purple-600 rounded-md font-bold py-1 w-full text-center px-2'> PENDING </button>
            <button onClick={() => updateOrderStatusHandler(orderId, "CONFIRMED")}
                className='bg-green-700 rounded-md font-bold py-1 w-full text-center px-2'> CONFIRMED </button>
            <button onClick={() => updateOrderStatusHandler(orderId, "CANCELLED")}
                className='bg-red-600 rounded-md font-bold py-1 w-full text-center px-2'> CANCELLED </button>
        </div>
    </>
}

export default UpdateStatusModel
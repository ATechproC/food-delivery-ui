import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { assets } from '../assets'
import { FaLocationDot } from 'react-icons/fa6'
import { FaCalendarDay } from 'react-icons/fa'
import MenuForSearchAndFilter from '../components/MenuForSearchAndFilter'
import { useParams } from 'react-router'
import { toast } from "react-toastify"
import axios from 'axios'
import { AppContext } from '../providers/AppProvider'

const Restaurant = () => {

    const { resId } = useParams();

    const [ restaurant, setRestaurant] = useState({});

    const { backendUrl} = useContext(AppContext);

    const getRestaurantDetails = async (id) => {
        try {
            
            const { data : { data }} = await axios.get(backendUrl + "/restaurants/" + id);

            setRestaurant(data);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getRestaurantDetails(resId);
    }, [resId])

    return (
        <>
            <NavBar />
            <div>
                <div className='relative w-[85%] h-[260px] mx-auto bg-red-600 rounded-md overflow-hidden'>
                    <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]' />
                    <div className='w-full h-full'>
                        <img
                            className='w-full h-full object-cover'
                            src={assets.res1} draggable={false} />
                    </div>
                </div>
                <div className='w-[85%] mx-auto py-4 flex flex-col gap-3'>
                    <h2 className='font-semibold text-[20px]'> {restaurant?.name} </h2>
                    <p className='w-[80%]'>
                        {restaurant?.description}
                    </p>
                    <div className='flex-items gap-3'>
                        <FaLocationDot />
                        <p className='text-gray-400'>Location: {restaurant?.address?.city} </p>
                    </div>
                    <div className='flex-items gap-3'>
                        <FaCalendarDay />
                        <p className='text-gray-400'>Hours: Mon-Sun: 9:00 AM - 9:00 PM (Today)</p>
                    </div>
                </div>
                <hr className=' w-[70%] mx-auto bg-gray-800' />
            </div>
            <div className='w-[85%] mx-auto'>
                <MenuForSearchAndFilter resId={resId} />
            </div>
        </>
    )
}

export default Restaurant
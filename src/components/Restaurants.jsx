import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router';
import { toast } from "react-toastify"
import axios from "axios"
import { AppContext } from "../providers/AppProvider"

const Restaurants = () => {

    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);

    const { backendUrl, jwt, setResId } = useContext(AppContext);

    const getAllRestaurants = async () => {
        try {

            const { data: { data } } = await axios.get(backendUrl + "/restaurants/all");
            setRestaurants(data);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllRestaurants();
    }, []);

    const addResToFav = async (id) => {
        try {

            const { data: { message } } = await axios.post(backendUrl + "/restaurants/add-to-favorite/" + id,
                {}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            )

            toast.success(message);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }
    }


    return <div className='w-[90%] mx-auto py-8'>
        <h2 className='text-[30px] font-bold text-center py-5 text-gray-500'>Order From Our Handpicked Favorites</h2>
        <div className='flex-items justify-evenly gap-1'>
            {
                restaurants.map(({ id: resId, name, description, open, address: { city } }) => <div
                    key={resId}
                    className='relative flex flex-col gap-4 bg-[#e91e63] py-3 px-5 rounded pb-6'>
                    <span style={{ backgroundColor: open ? "green" : "red" }}
                        className='absolute top-3 left-4 px-3 py-1 rounded'>
                        {open ? "open" : "close"}
                    </span>
                    <div
                        onClick={() => {
                            if (open) {
                                navigate(`/restaurant/${city}/${resId}`);
                                setResId(resId);
                                scrollTo(0, 0);
                            }
                        }}
                        style={{ cursor: open ? "pointer" : "default" }}
                        className=' h-[150px] w-full rounded'>
                        <img className='h-full w-full object-cover' src={assets.res1} draggable={false} />
                    </div>
                    <div>
                        <div className='relative flex-items gap-5'>
                            <div className='flex flex-col gap-2'>
                                <p className='font-bold text-[20px] capitalize'> {name} </p>
                                <p className='font-semibold capitalize'> {description} </p>
                            </div>
                            <FaHeart
                                onClick={() => {
                                    if (open)
                                        addResToFav(resId);
                                }}
                                className='cursor-pointer absolute top-1 right-0 text-[22px]' />
                            <FaRegHeart
                                onClick={() => {
                                    if (open)
                                        addResToFav(resId);
                                }}
                                className='cursor-pointer absolute top-1 right-0 text-[22px]' />
                        </div>
                    </div>
                </div>)
            }
        </div>
    </div>
}

export default Restaurants
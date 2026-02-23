import React, { useContext, useEffect, useState } from 'react'
import Profile from './Profile'
import { assets } from '../assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../providers/AppProvider'

const Favorites = () => {

    const { backendUrl, jwt} = useContext(AppContext);
    const [restaurants, setRestaurants] = useState([]);

    const fetchUserFavoriteRestaurants = async () => {
        try {

            const { data : {data}} = await axios.get(backendUrl + "/restaurants/user/favorite", {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })

            setRestaurants(data);
            
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUserFavoriteRestaurants();
    }, []);

    return (
        <div>
            <Profile />
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] mx-auto py-8'>
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
                                    className='cursor-pointer h-[150px] w-full rounded'>
                                    <img className='h-full w-full object-cover' src={assets.res1} draggable={false} />
                                </div>
                                <div>
                                    <div className='relative flex-items gap-5'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-bold text-[20px] capitalize'> {name} </p>
                                            <p className='font-semibold capitalize'> {description} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
        </div>
    )
}

export default Favorites
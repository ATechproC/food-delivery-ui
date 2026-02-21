import React, { useState } from 'react'
import { restaurants } from '../assets'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const Restaurants = () => {

    const navigate = useNavigate();

    const [items, setItems] = useState(restaurants);

    const handleHearClick = (id) => {
        const newArray = [...items];
        for (let i = 0; i < items.length; i++) {
            if (id - 1 == i) {
                newArray[i].isClicked = !items[i].isClicked;
            };
        }
        setItems(newArray);
    }

    return <div className='w-[90%] mx-auto py-8'>
        <h2 className='text-[30px] font-bold text-center py-5 text-gray-500'>Order From Our Handpicked Favorites</h2>
        <div className='flex-items justify-evenly gap-1'>
            {
                items.map(({ id, url, name, description, isClicked, city }) => <div
                    key={id}
                    className='flex flex-col gap-4 bg-[#e91e63] py-3 px-5 rounded pb-6'>
                    <div
                        onClick={() => {
                            navigate(`/restaurant/${city}/${id}`);
                            scrollTo(0, 0);
                        }}
                        className='cursor-pointer h-[150px] w-full rounded'>
                        <img className='h-full w-full object-cover' src={url} draggable={false} />
                    </div>
                    <div>
                        <div className='relative flex-items gap-5'>
                            <div className='flex flex-col gap-2'>
                                <p className='font-bold text-[20px] capitalize'> {name} </p>
                                <p className='font-semibold capitalize'> {description} </p>
                            </div>
                            {
                                isClicked ? <FaHeart
                                    onClick={() => {
                                        handleHearClick(id);
                                    }}
                                    className='cursor-pointer absolute top-1 right-0 text-[22px]' />
                                    : <FaRegHeart
                                        onClick={() => {
                                            handleHearClick(id);
                                        }}
                                        className='cursor-pointer absolute top-1 right-0 text-[22px]' />
                            }
                        </div>
                    </div>
                </div>)
            }

            {/* <div className='flex flex-col gap-4 bg-[#e91e63] py-3 px-5 rounded pb-6'>
                <div className='cursor-pointer h-[150px] w-full rounded'>
                    <img className='h-full w-full object-cover' src={assets.res1} draggable={false} />
                </div>
                <div>
                    <div className='relative flex-items gap-5'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-[20px] capitalize'>restaurant name</p>
                            <p className='font-semibold capitalize'>restaurant description</p>
                        </div>
                        <FaRegHeart className='absolute top-1 right-0 text-[22px]' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 bg-[#e91e63] py-3 px-5 rounded pb-6'>
                <div className='cursor-pointer h-[150px] w-full rounded'>
                    <img className='h-full w-full object-cover' src={assets.res1} draggable={false} />
                </div>
                <div>
                    <div className='relative flex-items gap-5'>
                        <div className='relative flex flex-col gap-2'>
                            <p className='font-bold text-[20px] capitalize'>restaurant name</p>
                            <p className='font-semibold capitalize'>restaurant description</p>
                        </div>
                        <FaRegHeart className='absolute top-1 right-0 text-[22px]' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 bg-[#e91e63] py-3 px-5 rounded pb-6'>
                <div className='cursor-pointer h-[150px] w-full rounded'>
                    <img className='h-full w-full object-cover' src={assets.res1} draggable={false} />
                </div>
                <div>
                    <div className='relative flex-items gap-5'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-[20px] capitalize'>restaurant name</p>
                            <p className='font-semibold capitalize'>restaurant description</p>
                        </div>
                        <FaRegHeart className='absolute top-1 right-0 text-[22px]' />
                    </div>
                </div>
            </div> */}
        </div>
    </div>
}

export default Restaurants
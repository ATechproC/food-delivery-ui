import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaArrowRightLong, FaCartShopping } from 'react-icons/fa6'
import { assets } from '../assets';
// import { useNavigate } from 'react-router';
import NavBar from '../components/NavBar';

const Search = () => {

    const [search, setSearch] = useState("");

    // const navigate = useNavigate();

    return <>
        
        <NavBar />

        <div className='w-[80%] mx-auto pt-20'>
            <div className='w-full flex-center gap-3'>
                <FaSearch className='text-[18px] cursour-pointer cursor-pointer' />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-[80%] outline-none border-none rounded-sm px-2 py-1 bg-gray-500' />
            </div>
        </div>
        
        <div className='mx-auto w-fit mt-2'>
            <h2 className='text-[20px] font-bold py-5 text-gray-500'>Our Best Dishes</h2>
            <div className='flex-items gap-7 w-full'>
                <div className=''>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img
                            className='w-full h-full object-cover'
                            src={assets.meet6} draggable={false} />
                    </div>
                    <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
                </div>
                <div className=''>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img
                            className='w-full h-full object-cover'
                            src={assets.meet2} draggable={false} />
                    </div>
                    <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
                </div>
                <div className=''>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img
                            className='w-full h-full object-cover'
                            src={assets.meet3} draggable={false} />
                    </div>
                    <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
                </div>
                <div className=''>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img
                            className='w-full h-full object-cover'
                            src={assets.meet4} draggable={false} />
                    </div>
                    <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
                </div>
                <div className=''>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img
                            className='w-full h-full object-cover'
                            src={assets.meet5} draggable={false} />
                    </div>
                    <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
                </div>
            </div>
        </div>

        {/* boxes */}

        <div className='relative w-[80%] mx-auto p-8 bg-gray-950 flex-between rounded-lg'>
                <FaArrowRightLong className='absolute top-2 font-semibold right-4 text-[18px] text-right cursor-pointer' />
            <div className='flex flex-col gap-5'>
                <p className='font-bold text-[20px]'>Indian fast foot</p>
                <div>
                    <p className=''>chicken breast</p>
                    <span>$300</span>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, optio!
                </p>
            </div>
            <div className='flex flex-col items-center gap-3'>
                <div className='w-[150px] h-[100px] rounded-lg overflow-hidden'>
                    <img
                        className='w-full h-full object-contain'
                        src={assets.meet3} draggable={false} />
                </div>
                <p className='text-white text-[15px]r bg-green-600 px-5 rounded-md py-[3px] cursor-pointer'>Add</p>
            </div>
        </div>
    </>
}

export default Search
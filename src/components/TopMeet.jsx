import React from 'react'
import { assets } from '../assets'

const TopMeet = () => {
    return <div className='w-[90%] mx-auto py-10'>
        <h2 className='text-[30px] font-bold text-center py-5 text-gray-500'>Top Meets</h2>
        <div className='flex-items gap-7 mx-auto w-fit'>
            <div className=''>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden
                hover:-translate-y-[3px] transition-all duration-300'>
                    <img
                        className='w-full h-full object-cover'
                        src={assets.meet6} draggable={false} />
                </div>
                <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
            </div>
            <div className=''>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden
                hover:-translate-y-[3px] transition-all duration-300'>
                    <img
                        className='w-full h-full object-cover'
                        src={assets.meet2} draggable={false} />
                </div>
                <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
            </div>
            <div className=''>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden
                hover:-translate-y-[3px] transition-all duration-300'>
                    <img
                        className='w-full h-full object-cover'
                        src={assets.meet3} draggable={false} />
                </div>
                <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
            </div>
            <div className=''>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden
                hover:-translate-y-[3px] transition-all duration-300'>
                    <img
                        className='w-full h-full object-cover'
                        src={assets.meet4} draggable={false} />
                </div>
                <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
            </div>
            <div className=''>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden
                hover:-translate-y-[3px] transition-all duration-300'>
                    <img
                        className='w-full h-full object-cover'
                        src={assets.meet5} draggable={false} />
                </div>
                <p className='text-gray-300 text-[18px] text-center py-5'>food name</p>
            </div>
        </div>
    </div>
}

export default TopMeet
import React from 'react'
import { assets } from '../assets'

const Hero = () => {
    return (
        <div className='relative h-full'>
            <div className='relative h-[100%]'>
                <div className='absolute w-[100%] h-[100%] bg-[rgba(0,0,0,0.6)]' />
                <img
                    className='w-[100%] h-[100vh] object-cover'
                    src={assets.hero} draggable={false} />
            </div>
            <div className='absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'>
                <p className='text-[110px] font-bold'>ATechproC</p>
                <p className='text-[20px] text-center'>Taste the Convenience: Food, Fast and Delivered.</p>
            </div>
        </div>
    )
}

export default Hero
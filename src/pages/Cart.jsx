import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import { FaCircleMinus, FaCirclePlus, FaLocationDot } from 'react-icons/fa6'
import { assets } from "../assets/index"
import CartModel from '../components/CartModel'
import { CartModelContext } from '../providers/CartModelProvider'

const Cart = () => {

    const { setIsOpen } = useContext(CartModelContext);

    return <>
        <NavBar />
        <CartModel />
        <div className='pt-16 flex h-[100vh]'>
            <div className='bg-gray-900 p-3'>
                <div className='flex flex-col gap-2'>
                    <div className='relative flex-items w-[400px] gap-7 p-5'>
                        <div className='w-[100px] h-[100px] rounded-xl overflow-hidden bg-gray-900'>
                            <img className='w-full h-full object-cover' src={assets.meet2} draggable={false} />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold'>Chicken breast</h2>
                            <div className='flex flex-items gap-3'>
                                <FaCircleMinus className='cursor-pointer' />
                                <div className='font-bold text-[20px]'>1</div>
                                <FaCirclePlus className='cursor-pointer' />
                            </div>
                            <button className='text-[20px] absolute top-1/2 right-10'>$300</button>
                        </div>
                    </div>
                    <div className='w-[350px] flex flex-items gap-2 flex-wrap mx-auto'>
                        <span className='bg-gray-700 inline-block rounded-xl py-1 px-3'>ingredient 1</span>
                        <span className='bg-gray-700 inline-block rounded-xl py-1 px-3'>ingredient 2</span>
                        <span className='bg-gray-700 inline-block rounded-xl py-1 px-3'>ingredient 3</span>
                        <span className='bg-gray-700 inline-block rounded-xl py-1 px-3'>ingredient 4</span>
                        <span className='bg-gray-700 inline-block rounded-xl py-1 px-3'>ingredient 5</span>
                    </div>
                    <div className='p-5'>
                        <h2 className='font-bold py-5 text-[20px]'>Bill details</h2>
                        <div className='flex flex-col gap-3'>
                            <div className='flex-between'>
                                <p className='font-semibold'>Item Total</p>
                                <p className='font-semibold'>$120</p>
                            </div>
                            <div className='flex-between'>
                                <p className='font-semibold'>Deliver Fee</p>
                                <p className='font-semibold'>$120</p>
                            </div>
                            <div className='flex-between'>
                                <p className='font-semibold'>GST and Restaurant Charges</p>
                                <p className='font-semibold'>$120</p>
                            </div>
                            <div className='flex-between'>
                                <p className='font-semibold'>Total Pay</p>
                                <p className='font-semibold'>$120</p>
                            </div>
                            <div className='flex-between mt-3'>
                                <p className='font-semibold'>total</p>
                                <p className='font-semibold'>$120</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center gap-4 mx-auto mt-6'>
                <h2 className='text-[20px] font-bold'>Choose delivery address</h2>
                <div className='flex flex-col items-center gap-3 bg-gray-900 w-[300px] p-6 rounded-md'>
                    <div className='flex flex-items gap-2'>
                        <FaLocationDot />
                        <p className='font-bold'>Add new address</p>
                    </div>
                    <button
                    onClick={() => setIsOpen(true)}
                    className='button-style bg-[#e91e63] text-white px-6'>Add</button>
                </div>
            </div>
        </div>
    </>
}

export default Cart
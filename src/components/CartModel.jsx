import React, { useContext, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CartModelContext } from '../providers/CartModelProvider'

const CartModel = () => {

    const { isOpen, setIsOpen } = useContext(CartModelContext);

    const [inputValue, setInputValue] = useState({
        streetAddress: "",
        state: "",
        pinCode: "",
        city: ""
    })

    return isOpen && <>
        <div
            onClick={() => setIsOpen(false)}
            className='fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur-[5px] z-10 transition duration-300' />
        <div className='fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col gap-4 bg-gray-900 p-8 rounded-md transition-all duration-300'>
                <FaTimes
                    onClick={() => setIsOpen(false)}
                    className='absolute top-3 right-3 font-bold text-[18px] cursor-pointer' />
                <input
                    value={inputValue.streetAddress}
                    onChange={(e) => setInputValue({ ...inputValue, streetAddress: e.target.value })}
                    placeholder='Street address' className='input-style rounded-lg' />
                <div className='flex flex-items gap-2'>
                    <input
                        value={inputValue.state}
                        onChange={(e) => setInputValue({ ...inputValue, state: e.target.value })}
                        placeholder='State' className='input-style rounded-lg' />
                    <input
                        value={inputValue.pinCode}
                        onChange={(e) => setInputValue({ ...inputValue, pinCode: e.target.value })}
                        placeholder='Pincode' className='input-style rounded-lg' />
                </div>
                <input
                    value={inputValue.city}
                    onChange={(e) => setInputValue({ ...inputValue, city: e.target.value })}
                    placeholder='City' className='input-style rounded-lg' />
                <button
                    onClick={() => setIsOpen(false)}
                    className='px-4 py-2 font-bold text-[18px] bg-[#e91e63] text-start w-fit rounded-xl'>DELIVER HERE</button>
            </div>
        </div>
    </>
}

export default CartModel
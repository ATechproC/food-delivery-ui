import React, { useContext, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CartModelContext } from '../providers/CartModelProvider'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../providers/AppProvider';

const OrderModel = () => {

    const { isOpen, setIsOpen } = useContext(CartModelContext);

    const { backendUrl, jwt, resId } = useContext(AppContext);

    const [inputValue, setInputValue] = useState({
        streetAddress: "",
        stateProvince: "",
        postalCode: "",
        country: ""
    })

    const handleDelivering = async (resId) => {
        try {

            const { data: { message } } = await axios.post(backendUrl + "/orders/create?resId=" + resId, {
                "payment": "CREDIT_CARD",
                deliveryAddress: inputValue
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            toast.success(message);
            setIsOpen(!isOpen);

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

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
                        value={inputValue.stateProvince}
                        onChange={(e) => setInputValue({ ...inputValue, stateProvince: e.target.value })}
                        placeholder='State Province' className='input-style rounded-lg' />
                    <input
                        value={inputValue.postaCode}
                        onChange={(e) => setInputValue({ ...inputValue, postaCode: e.target.value })}
                        placeholder='Posal Code' className='input-style rounded-lg' />
                </div>
                <input
                    value={inputValue.country}
                    onChange={(e) => setInputValue({ ...inputValue, country: e.target.value })}
                    placeholder='Country' className='input-style rounded-lg' />
                <button
                    onClick={() => {
                        handleDelivering(resId);
                    }}
                    className='px-4 py-2 font-bold text-[18px] bg-[#e91e63] text-start w-fit rounded-xl'>DELIVER HERE</button>
            </div>
        </div>
    </>
}

export default OrderModel
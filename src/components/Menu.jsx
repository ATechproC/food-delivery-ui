import React, { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { MdFavorite } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router';
import { AppContext } from '../providers/AppProvider';

const Menu = () => {

    const navigate = useNavigate();

    const { setJwt } = useContext(AppContext);


    return <div className='h-[100vh] w-[220px] bg-gray-900 pt-24 flex flex-col gap-12'>
        <div
            onClick={() => navigate("/orders")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <RiListUnordered className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Orders</p>
        </div>
        <div
            onClick={() => navigate("/favorites")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdFavorite className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Favorites</p>
        </div>
        <div
            onClick={() => navigate("/address")}

            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <FaHome className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Address</p>
        </div>
        <div
            onClick={() => navigate("/payments")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdOutlinePayment className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Payments</p>
        </div>
        <div
            onClick={() => navigate("/notifications")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <IoIosNotifications className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Notifications</p>
        </div>
        <div
            onClick={() => navigate("/events")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdEvent className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Events</p>
        </div>
        <div
            onClick={() => {
                localStorage.removeItem("jwt");
                setJwt("");
                navigate("/");
            }}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <FiLogOut className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Logout</p>
        </div>
    </div>
}

export default Menu
import React from 'react'
import { MdCategory, MdDashboard, MdFavorite, MdMenu } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router';

const AdminMenu = () => {

    const navigate = useNavigate();

    return <div className='h-[100vh] min-w-[250px] bg-gray-900 pt-16 flex flex-col gap-12'>
        <div className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdDashboard className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Dashboard</p>
        </div>
        <div onClick={() => navigate("/admin/restaurant/orders")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <RiListUnordered className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Orders</p>
        </div>
        <div
            onClick={() => navigate("/admin/restaurant/menu")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdMenu
                className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Menu</p>
        </div>
        <div onClick={() => navigate("/admin/restaurant/category")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdCategory className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Food Category</p>
        </div>
        <div onClick={() => navigate("/admin/restaurant/ingredients")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdFavorite className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Ingredients</p>
        </div>
        <div className='flex-between w-[60%] mx-auto cursor-pointer'>
            <MdEvent className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Events</p>
        </div>
        <div onClick={() => navigate("/admin/restaurant/details")}
            className='flex-between w-[60%] mx-auto cursor-pointer'>
            <IoIosNotifications className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Details</p>
        </div>
        <div className='flex-between w-[60%] mx-auto cursor-pointer'>
            <FiLogOut className='text-[20px]' />
            <p className='text-[15px] font-semibold'>Logout</p>
        </div>
    </div>
}

export default AdminMenu
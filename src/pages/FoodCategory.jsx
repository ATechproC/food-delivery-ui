import React, { useContext, useEffect } from 'react'
import Menu from '../components/Menu';
import { FaEdit } from "react-icons/fa";
import AddCategoryModel from '../components/AddCategoryModel';
import { AddCategoryModelContext } from '../providers/AddCategoryModelProvider';
import AdminMenu from '../components/AdminMenu';

const FoodCategory = () => {

    const { isOpen, setIsOpen, foodCategories, fetchAllFoodCategories } = useContext(AddCategoryModelContext);

    useEffect(() => {
        fetchAllFoodCategories();
    }, []);

    return <div className='flex gap-10 w-full'>
        <AdminMenu />
        <AddCategoryModel />
        <div className='m-3 w-full pr-5'>
            <div className='flex-between'>
                <h2 className='text-[30px] font-bold'>Category</h2>
                <FaEdit
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-[25px] font-bold cursor-pointer' />
            </div>
            <div className='w-full mt-6 flex flex-col'>
                <div className='flex-between border-[2px] p-3'>
                    <p className='font-bold text-[20px] w-full '>id</p>
                    <p className='font-bold text-[20px] w-full text-center'>Category</p>
                </div>
                <div className='border-[2px] p-3 border-t-0 flex flex-col gap-5'>
                    {
                        foodCategories.map(({id, name}) => <div key={id}className='flex-between'>
                        <p className='w-full '> {id} </p>
                        <p className='w-full text-center'> {name} </p>
                    </div>)
                    }
                </div>
            </div>
        </div>
    </div>
}

export default FoodCategory
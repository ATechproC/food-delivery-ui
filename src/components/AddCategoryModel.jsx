import React, { useContext, useState } from 'react'
import { AddCategoryModelContext } from '../providers/AddCategoryModelProvider';
import { AppContext } from '../providers/AppProvider';
import axios from 'axios';

const AddCategoryModel = () => {

    const { isOpen, setIsOpen, fetchAllFoodCategories } = useContext(AddCategoryModelContext);

    const { backendUrl, jwt } = useContext(AppContext);

    const [name, setName] = useState("");

    const addCategoryHandler = async () => {
        try {

            await axios.post(backendUrl + "/categories/create", {name}, {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })

            await fetchAllFoodCategories();

            setIsOpen(!isOpen);

            setName("");

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }


    return isOpen && <>
        <div onClick={() => setIsOpen(!isOpen)}
            className='fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur-[5px] z-10 transition duration-300' />
        <div className='fixed z-10 left-1/2 top-1/2 -translate-x-1/2
    -translate-y-1/2 bg-gray-800 flex flex-col gap-4 w-[300px] p-5 py-7 rounded-md transition duration-300'>
            <input value={name} onChange={(e) => setName(e.target.value)}
                type='text' placeholder='Category name' className='input-style rounded-md' />
            <div className='flex-items gap-3'>
                <button onClick={() => {
                    addCategoryHandler();
                }}
                    className='input-style bg-[#e91e63] text-white w-fit rounded-md'>CREATE</button>
                <button onClick={() => setIsOpen(!isOpen)}
                    className='input-style bg-black text-white w-fit rounded-md'>CANCEL</button>
            </div>
        </div>
    </>
}

export default AddCategoryModel
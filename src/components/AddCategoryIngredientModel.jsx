import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AppContext } from '../providers/AppProvider';
import { AddIngredientCategoryContext } from '../providers/AddIngredientCategoryProvider';

const AddCategoryIngredientModel = () => {

    const [name, setName] = useState("");

    const { backendUrl, jwt } = useContext(AppContext);

    const {
        isCategorytModelOpen, setIsCategoryModelOpen, fetchIngredientCategoies
    } = useContext(AddIngredientCategoryContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(backendUrl + "/ingredients/create-ingredient-category",
                { name }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            )
            await fetchIngredientCategoies();
            setIsCategoryModelOpen(!isCategorytModelOpen);
            setName("");
        } catch (error) {
            console.log(error.response?.data?.message || error.message)
        }
    }

    return isCategorytModelOpen && <>
        <div onClick={() => setIsCategoryModelOpen(!isCategorytModelOpen)}
            className='fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur-[5px] z-10 transition duration-300' />
        <form onSubmit={onSubmitHandler}
            className='fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-8 flex flex-col gap-6 bg-gray-900 rounded-md transition-all duration-300'>
            <input value={name}
                onChange={(e) => setName(e.target.value)} required
                placeholder='Name' className='w-full input-style rounded-md' />
            <button
                type='submit' className='input-style bg-[#e91e63] text-white w-fit rounded-md'>CREATE CATEGORY</button>
        </form>
    </>
}

export default AddCategoryIngredientModel
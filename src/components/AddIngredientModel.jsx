import React, { useContext, useEffect, useState } from 'react'
import { AddIngredientsContext } from '../providers/AddIngredientsProvider';
import { AddCategoryModelContext } from '../providers/AddCategoryModelProvider';
import axios from 'axios';
import { AppContext } from '../providers/AppProvider';
import { AddIngredientCategoryContext } from '../providers/AddIngredientCategoryProvider';

const AddIngredientModel = () => {

    const [name, setName] = useState("");

    const {
        isIngredientModelOpen, setIsIngredientModelOpen,
        fetchIngrdients
    } = useContext(AddIngredientsContext);

    useEffect(() => {
        fetchIngrdients();
    }, []);

    const { fetchIngredientCategoies, ingredientCategories } = useContext(AddIngredientCategoryContext);

    useEffect(() => {
        fetchIngredientCategoies
    }, []);

    const { backendUrl, jwt } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(backendUrl + "/ingredient-items/create-ingredient-item?categoryId=" + clickedId, { name }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            await fetchIngrdients();
            setName("");
            setIsIngredientModelOpen(!isIngredientModelOpen);
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }

    const [clickedId, setClickedId] = useState(1);

    return isIngredientModelOpen && <>
        <div onClick={() => setIsIngredientModelOpen(!isIngredientModelOpen)}
            className='fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur-[5px] z-10 transition duration-300' />
        <form onSubmit={onSubmitHandler}
            className='fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-8 flex flex-col gap-6 bg-gray-900 rounded-md transition-all duration-300'>
            <input value={name}
                onChange={(e) => setName(e.target.value)} required
                placeholder='Ingredient name' className='w-full input-style rounded-md' />
            <div className='flex justify-evenly items-center gap-4'>
                <p className='font-bold'>Category</p>
                <div className='flex flex-col gap-1'>
                    {
                        ingredientCategories.map((item, index) => {
                            return <div key={item.id}
                                className='flex-items gap-4'>
                                <div
                                    onClick={() => setClickedId(item.id)}
                                    style={{ backgroundColor: index == clickedId - 1 ? "white" : "" }}
                                    className='w-[15px] h-[15px] rounded-full border-white border-[2px] cursor-pointer' />
                                <p> {item.name} </p>
                            </div>
                        })
                    }
                </div>
            </div>
            {/* <div className='flex justify-evenly items-center gap-4'>
                <p className='font-bold'>isAvailible</p>
                <select value={inputsValue.isAvailable} onChange={(e) => setInputsValue({ ...inputsValue, isAvailable: e.target.value })}
                    className='input-style rounded-md w-1/2'>
                    <option value="true" selected>Yes</option>
                    <option value="false">No</option>
                </select>
            </div> */}
            <button
                type='submit' className='input-style bg-[#e91e63] text-white w-fit rounded-md'>CREATE INGREDIENT</button>
        </form>
    </>
}

export default AddIngredientModel
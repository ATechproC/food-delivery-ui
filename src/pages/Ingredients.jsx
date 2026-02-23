import React, { useContext, useEffect } from 'react'
import AddIngredientModel from '../components/AddIngredientModel'
import AddCategoryIngredientModel from '../components/AddCategoryIngredientModel'
import { FaEdit } from 'react-icons/fa'
import AdminMenu from '../components/AdminMenu'
import { AddIngredientCategoryContext } from '../providers/AddIngredientCategoryProvider'
import { AddIngredientsContext } from '../providers/AddIngredientsProvider'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../providers/AppProvider'

const Ingredients = () => {

    const { isCategorytModelOpen, setIsCategoryModelOpen,
        fetchIngredientCategoies, ingredientCategories
    } = useContext(AddIngredientCategoryContext);

    const {
        isIngredientModelOpen, setIsIngredientModelOpen,
        fetchIngrdients, ingredients
    } = useContext(AddIngredientsContext);

    const { backendUrl, jwt } = useContext(AppContext);

    useEffect(() => {
        fetchIngredientCategoies();
    }, []);

    useEffect(() => {
        fetchIngrdients();
    }, []);

    // handle ingredient item availability :

    const handleAvailability = async (id, ingCatId) => {
        try {

            await axios.put(backendUrl + `/ingredient-items/update-stock/${id}?categoryId=${ingCatId}`, {}, {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })

            await fetchIngrdients();

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return <div className='flex gap-10'>
        <AdminMenu />
        <AddIngredientModel />
        <AddCategoryIngredientModel />
        <div className='w-full'>
            <div className='m-3 w-full pr-5'>
                <div className='flex gap-4'>
                    <div className='w-full mt-4 flex flex-col'>
                        <div className='flex-between py-3'>
                            <h2 className='text-[30px] font-bold'>Ingredients</h2>
                            <FaEdit onClick={() => setIsIngredientModelOpen(!isIngredientModelOpen)}
                                className='text-[25px] font-bold cursor-pointer' />
                        </div>
                        <div className='flex-between border-[2px] p-3 w-full'>
                            <p className='font-bold text-[20px] w-full '>id</p>
                            <p className='font-bold text-[20px] w-full text-center'>Name</p>
                            <p className='font-bold text-[20px] w-full text-center'>Category</p>
                            <p className='font-bold text-[20px] w-full text-center'>Availability</p>
                        </div>
                        <div>
                            {
                                ingredients.map(({ id, name, isInStock, ingredientCategory }) => {
                                    return <div key={id} className='flex-between border-[2px] p-3 border-t-0'>
                                        <p className='font-bold text-[20px] w-full '>id</p>
                                        <p className='font-bold text-[20px] w-full text-center'> {name} </p>
                                        <p className='font-bold text-[20px] w-full text-center'> {ingredientCategory.name} </p>
                                        <button
                                            onClick={() => handleAvailability(id, ingredientCategory.id)}
                                            style={{ backgroundColor: isInStock ? "green" : "red" }}
                                            className='font-bold w-full text-center py-1 rounded-md'>
                                            {isInStock ? "IN STOCK" : "OUT OF STOCK"}
                                        </button>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                    <div className='mt-4 flex flex-col w-[30%]'>
                        <div className='flex-between py-3'>
                            <h2 className='text-[30px] font-bold'>Category</h2>
                            <FaEdit onClick={() => setIsCategoryModelOpen(!isCategorytModelOpen)}
                                className='text-[25px] font-bold cursor-pointer' />
                        </div>
                        <div className='flex-between border-[2px] p-3 w-full'>
                            <p className='font-bold text-[20px] w-full '>id</p>
                            <p className='font-bold text-[20px] w-full text-center'>Name</p>
                        </div>
                        <div>
                            {
                                ingredientCategories.map(({ id, name }) => {
                                    return <div key={id}
                                        className='flex-between border-[2px] p-3 border-t-0'>
                                        <p className='font-bold text-[20px] w-full '> {id} </p>
                                        <p className='font-bold text-[20px] w-full text-center'> {name} </p>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default Ingredients
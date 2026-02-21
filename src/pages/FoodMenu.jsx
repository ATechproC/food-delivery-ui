import React, { useContext, useEffect, useState } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md';
import AdminMenu from '../components/AdminMenu';
import axios from 'axios';
import { AppContext } from '../providers/AppProvider';
import { AddCategoryModelContext } from '../providers/AddCategoryModelProvider';
import { AddIngredientsContext } from '../providers/AddIngredientsProvider';
import { toast } from "react-toastify";
import { FoodContext } from '../providers/FoodProvider';
import FoodMenuItems from '../components/FoodMenuItems';

const FoodMenu = () => {

    const [isResCreated, setIsResCreated] = useState(!false);

    const [image, setImage] = useState("");

    const { foodCategories, fetchAllFoodCategories } = useContext(AddCategoryModelContext);

    useEffect(() => {
        fetchAllFoodCategories();
    }, []);

    const { fetchIngrdients, ingredients } = useContext(AddIngredientsContext);

    useEffect(() => {
        fetchIngrdients();
    }, []);

    const { fetchFoodItems } = useContext(FoodContext);

    const { backendUrl, jwt } = useContext(AppContext);

    const [inputsValue, setInputsValue] = useState({
        name: "",
        description: "",
        price: "",
        "images": [
            "https://example.com/images/margherita1.jpg",
            "https://example.com/images/margherita2.jpg"
        ],
        isVegetarian: false,
        isSeasonal: true
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("hi")

        if(!image) toast.warn("Image not selected");
        try {
            await axios.post(backendUrl + "/food/create?categoryId=" + clickedId, {
                ...inputsValue, price: parseInt(inputsValue.price), ingredients: selectedIngredients
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            await fetchFoodItems();
            setIsResCreated(true);
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }

    //  "name": "Margherita Pizz1a1",
    // "description": "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil.",
    // "price": 89.90,
    // "images": [
    //     "https://example.com/images/margherita1.jpg",
    //     "https://example.com/images/margherita2.jpg"
    // ],
    // "isVegetarian": true,
    // "isSeasonal": false

    const [clickedId, setClickedId] = useState(1);

    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const addToIngredientsHandler = (id) => {
        const newArray = [...selectedIngredients];
        let isExists = false;
        let existsId;
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id == id) {
                existsId = i;
                isExists = true;
                break;
            }
        }

        if (!isExists) {
            for (let i = 0; i < ingredients.length; i++) {
                if (ingredients[i].id == id) {
                    newArray[newArray.length] = ingredients[i];
                    break;
                }
            }
        } else {
            for (let i = existsId; i < newArray.length - 1; i++) {
                newArray[i] = newArray[i + 1];
            }
            newArray.length -= 1;
        }

        setSelectedIngredients(newArray);
    }

    return !isResCreated ? <div className='flex-items gap-20'>
        <AdminMenu />
        <form
            onSubmit={onSubmitHandler}
            className='pt-8 flex flex-col gap-3 min-w-[800px] mx-auto'>
            <div className='w-fit pb-3'>
                <label htmlFor='image'>
                    <div className='w-[100px] h-[100px] rounded-md border-[2px] overflow-hidden cursor-pointer border-white bg-gray-800 flex-center text-[30px]'>
                        {
                            image ? <img src={URL.createObjectURL(image)}
                                className='w-full h-full object-cover' />
                                : <BiSolidImageAdd />
                        }
                    </div>
                </label>
                <input onChange={(e) => {
                    setImage(e.target.files[0])
                }}
                    id="image" type='file' hidden={true} />
            </div>
            <input value={inputsValue.name}
                onChange={(e) => setInputsValue({ ...inputsValue, name: e.target.value })} required
                placeholder='Name' className='w-full input-style rounded-md' />
            <input value={inputsValue.description}
                onChange={(e) => setInputsValue({ ...inputsValue, description: e.target.value })} required placeholder='Description' className='w-full input-style rounded-md' />
            <input value={inputsValue.price}
                onChange={(e) => setInputsValue({ ...inputsValue, price: e.target.value })} required placeholder='Price' className='w-full input-style rounded-md' />
            <div className='flex-items justify-evenly'>
                <div className='flex flex-col'>
                    {
                        foodCategories.map((item, index) => {
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
                <div className='flex justify-evenly items-center gap-4'>
                    <div className='flex flex-col gap-1'>
                        {
                            ingredients.map(({ id, name }) => {
                                return <div key={id} className='flex-items gap-1'>
                                    <input onChange={() => addToIngredientsHandler(id)}
                                        type='checkbox' id={name} />
                                    <label htmlFor={name} > {name} </label>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='flex justify-evenly items-center gap-4'>
                <p className='font-bold'>isVegetarian</p>
                <select value={inputsValue.isVegetarian} onChange={(e) => setInputsValue({ ...inputsValue, isVegetarian: e.target.value })}
                    className='input-style rounded-md w-1/2'>
                    <option value="true" selected>Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className='flex justify-evenly items-center gap-4'>
                <p className='font-bold'>isSeasonal</p>
                <select value={inputsValue.isSeasonal} onChange={(e) => setInputsValue({ ...inputsValue, isSeasonal: e.target.value })}
                    className='input-style rounded-md w-1/2'>
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                </select>
            </div>
            <button
                type='submit' className='input-style bg-[#e91e63] text-white w-fit rounded-md'>CREATE MENU ITEM</button>
        </form>
    </div>
        : <FoodMenuItems />
}

export default FoodMenu
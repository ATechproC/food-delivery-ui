import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AddToCartContext } from '../providers/AddToCartProvider';
import { AppContext } from '../providers/AppProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import IngredientsItemsInputs from './IngredientsItemsInputs';
import { InputsContext } from '../providers/IngredientsInputsProvider';
import { useNavigate } from 'react-router';

const MenuForSearchAndFilter = ({ resId }) => {

    const navigate = useNavigate();

    // const { setAddToCart } = useContext(AddToCartContext);

    const foodType = [
        {
            "id": 1,
            "text": "All",
            "isSelected": true
        },
        {
            "id": 2,
            "text": "Vegetarian Only",
            "isSelected": false
        },
        {
            "id": 3,
            "text": "Non-Vegetarian Only",
            "isSelected": false
        },
        {
            "id": 4,
            "text": "Seasonal",
            "isSelected": false

        }
    ]

    const [foodTypeState, setFoodTypeState] = useState(foodType);

    const foodTypeHandleClick = (id) => {
        const state = [...foodTypeState];
        for (let i = 0; i < foodTypeState.length; i++) {
            if (i + 1 == id) {
                if (!state[i].isSelected)
                    state[i].isSelected = !state[i].isSelected;
            } else state[i].isSelected = false;
        }
        setFoodTypeState(state);
    }

    const handlerFilter = async (id) => {

        try {
            if (id == 2) {
                const { data: { data } } = await axios.get(backendUrl + `/food/restaurant/${resId}?isVegetarian=true`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })

                setFoodDetais(data);
            } else if (id == 3) {
                const { data: { data } } = await axios.get(backendUrl + `/food/restaurant/${resId}?isSeasonal=true`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                setFoodDetais(data);
            } else getFoodDetails();

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }

        foodTypeHandleClick(id);
    }

    // Food category handler :

    const foodCategoy = [
        {
            "id": 1,
            "text": "All",
            "isSelected": true
        },
        {
            "id": 2,
            "text": "piza",
            "isSelected": false
        },
        {
            "id": 3,
            "text": "biryani",
            "isSelected": false
        },
        {
            "id": 4,
            "text": "burger",
            "isSelected": false
        },
        {
            "id": 5,
            "text": "Chicken",
            "isSelected": false
        },
        {
            "id": 6,
            "text": "poha",
            "isSelected": false
        }
    ]

    const [foodCategoryState, setFoodCategoryState] = useState(foodCategoy);

    const foodCategoryHandler = (id) => {
        const state = [...foodCategoy];
        for (let i = 0; i < state.length; i++) {
            if (i + 1 == id) {
                if (!state[i].isSelected)
                    state[i].isSelected = !state[i].isSelected;
            } else state[i].isSelected = false;
        }
        setFoodCategoryState(state);
    }

    const handleSearch = async (id) => {
        try {

            if (id != 1) {
                const { data: { data } } = await axios.get(backendUrl + `/food/search?keyword=${foodCategoy[id - 1].text}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });

                setFoodDetais(data);
            } else getFoodDetails();

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
        foodCategoryHandler(id);
    }

    // handle open box :

    const [isOpen, setIsOpen] = useState(!false);


    // hangle food category :

    const { backendUrl, jwt } = useContext(AppContext);

    const [foodDetails, setFoodDetais] = useState([]);

    const getFoodDetails = async () => {
        try {

            const { data: { data } } = await axios.get(backendUrl + `/food/restaurant/${resId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setFoodDetais(data);
            // console.log(data);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getFoodDetails();
    }, []);

    // handle selected ingredients & add to cart  :

    const { selectedIngredientsItems } = useContext(InputsContext);

    const addToCartHandler = async (id) => {
        try {

            const { data: { message } } = await axios.post(backendUrl + `/carts/add-item?foodId=${id}`, { ingredientsItems : selectedIngredientsItems }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            toast.success(message);
            navigate("/cart")

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className='flex items-start gap-5 '>
            <div className=' bg-gray-900 w-[300px] rounded-md my-5 p-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-[20px] py-5'>Food Type</h2>
                    {
                        foodTypeState.map(({ id, text, isSelected }) => {
                            return <div
                                key={id} className='flex-items gap-3'>
                                <div key={id}
                                    onClick={() => {
                                        handlerFilter(id);
                                    }}
                                    style={{ backgroundColor: isSelected ? "#e91e63" : "" }}
                                    className='cursor-pointer w-[15px] h-[15px] rounded-full bg-black border-[2px] border-[#e91e63]' />
                                <p> {text} </p>
                            </div>
                        })
                    }
                </div>
                <div className=''>
                    <h2 className='font-bold text-[20px] py-5'>Food Category</h2>
                    <div className='flex flex-col gap-2'>
                        {
                            foodCategoryState.map(({ id, text, isSelected }) => {
                                return <div
                                    key={id} className='flex-items gap-3'>
                                    <div key={id}
                                        onClick={() => handleSearch(id)}
                                        style={{ backgroundColor: isSelected ? "#e91e63" : "" }}
                                        className='cursor-pointer w-[15px] h-[15px] rounded-full bg-black border-[2px] border-[#e91e63]' />
                                    <p> {text} </p>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className=''>
                {
                    foodDetails.length > 0 && foodDetails.map(item => <div
                        key={item.id}
                        style={{ height: isOpen ? "" : "200px" }}
                        className='relative bg-gray-900 p-4 my-5 rounded-md overflow-hidden transition-all duration-300 w-[100vh]'>
                        <div className='flex-items gap-3'>
                            <div className='w-[200px] h-[200px] rouned-md overflow-hidden'>
                                <img
                                    className='w-full h-full object-contain'
                                    src={assets.meet3} draggable={false} />
                            </div>
                            <div className='flex flex-col ml-5 gap-2'>
                                <p className='font-bold'> {item.name} </p>
                                <span> ${item.price} </span>
                                <p className='w-[90%]'> {item.description} </p>
                            </div>
                            {
                                !isOpen ? <IoIosArrowDown
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='absolute top-1/2 right-2 -translate-y-1/2 font-bold text-[30px] cursor-pointer' />
                                    : <IoIosArrowUp
                                        onClick={() => setIsOpen(!isOpen)}
                                        className='absolute top-1/2 right-2 -translate-y-1/2 font-bold text-[30px] cursor-pointer' />
                            }
                        </div>
                        <IngredientsItemsInputs
                            food={item}
                        />
                        {
                            item.available ? <button
                                onClick={() => addToCartHandler(item.id)}
                                className='button-style text-white bg-[#e91e63] mt-5'>Add To Cart</button> : <button className='button-style bg-gray-400 text-gray-800 cursor-not-allowed mt-5'>OUT OF STOCK</button>
                        }
                    </div>)
                }
            </div>

        </div>
    )
}

export default MenuForSearchAndFilter
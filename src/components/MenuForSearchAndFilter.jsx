import React, { useContext, useState } from 'react'
import { assets } from '../assets';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AddToCartContext } from '../providers/AddToCartProvider';

const MenuForSearchAndFilter = () => {

    const { setAddToCart } = useContext(AddToCartContext);

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
                state[i].isSelected = !state[i].isSelected;
            } else state[i].isSelected = false;
        }
        setFoodTypeState(state);
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
                state[i].isSelected = !state[i].isSelected;
            } else state[i].isSelected = false;
        }
        setFoodCategoryState(state);
    }

    // handle open box :

    const [isOpen, setIsOpen] = useState(false);

    // add to cart handler :

    const addToCartHandler = () => {
        setAddToCart(prev => prev + 1);
    }

    return (
        <div className='flex items-start gap-5'>
            <div className=' bg-gray-900 w-[300px] rounded-md my-5 p-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-[20px] py-5'>Food Type</h2>
                    {
                        foodTypeState.map(({ id, text, isSelected }) => {
                            return <div
                                key={id} className='flex-items gap-3'>
                                <div key={id}
                                    onClick={() => foodTypeHandleClick(id)}
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
                                        onClick={() => foodCategoryHandler(id)}
                                        style={{ backgroundColor: isSelected ? "#e91e63" : "" }}
                                        className='cursor-pointer w-[15px] h-[15px] rounded-full bg-black border-[2px] border-[#e91e63]' />
                                    <p> {text} </p>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div
                style={{ height: isOpen ? "" : "200px" }}
                className=' bg-gray-900 p-4 my-5 rounded-md overflow-hidden transition-all duration-300'>
                <div className='flex-items gap-3'>
                    <div className='w-[200px] h-[200px] rouned-md overflow-hidden'>
                        <img
                            className='w-full h-full object-contain'
                            src={assets.meet3} draggable={false} />
                    </div>
                    <div className='flex flex-col ml-5 gap-2'>
                        <p className='font-bold'>Burgar</p>
                        <span>$400</span>
                        <p className='w-[90%]'>A hamburger or simply burger is a food consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll</p>
                    </div>
                    {
                        !isOpen ? <IoIosArrowDown
                            onClick={() => setIsOpen(!isOpen)}
                            className='font-bold text-[30px] cursor-pointer' />
                            : <IoIosArrowUp
                                onClick={() => setIsOpen(!isOpen)}
                                className='font-bold text-[30px] cursor-pointer' />
                    }
                </div>
                <div className='flex justify-evenly w-full '>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-semibold'>Nuts & Seeds</h2>
                        <div className='flex-items gap-5'>
                            <input id='input1' type='checkbox' />
                            <label htmlFor='input1'>Cashows</label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-semibold'>Protein</h2>
                        <div className='flex-items gap-5'>
                            <input id='input2' type='checkbox' />
                            <label htmlFor='input2'>Ground Beef</label>
                        </div>
                        <div className='flex-items gap-5'>
                            <input id='input3' type='checkbox' />
                            <label htmlFor='input3'>Bacon strips</label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-semibold'>Bread</h2>
                        <div className='flex-items gap-5'>
                            <input id='input4' type='checkbox' />
                            <label htmlFor='input4'>Humburger buns</label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-semibold'>Vegetarian</h2>
                        <div className='flex-items gap-5'>
                            <input id='input5' type='checkbox' />
                            <label htmlFor='input5'>Lettuce </label>
                        </div>
                        <div className='flex-items gap-5'>
                            <input id='input6' type='checkbox' />
                            <label htmlFor='input6'>Tomato</label>
                        </div>
                        <div className='flex-items gap-5'>
                            <input id='input6' type='checkbox' />
                            <label htmlFor='input6'>Tomato</label>
                        </div>
                        <div className='flex-items gap-5'>
                            <input id='input6' type='checkbox' />
                            <label htmlFor='input6'>Tomato</label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-semibold'>Nuts & Seeds</h2>
                        <div className='flex-items gap-5'>
                            <input id='input1' type='checkbox' />
                            <label htmlFor='input1'>Cashows</label>
                        </div>
                    </div>
                </div>
                <button
                onClick={() => addToCartHandler()}
                    className='button-style text-white bg-[#e91e63]'>Add To Cart</button>
            </div>
        </div>
    )
}

export default MenuForSearchAndFilter
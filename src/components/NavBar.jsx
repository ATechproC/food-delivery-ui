import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useSignProvider } from '../providers/SignupProvider';
import { useNavigate } from 'react-router';
import { AddToCartContext } from '../providers/AddToCartProvider';
import { assets } from '../assets';
import { AppContext } from '../providers/AppProvider';

const NavBar = () => {

    const { isOpen, setIsOpen } = useSignProvider();
    const { addToCart } = useContext(AddToCartContext);

    const { jwt } = useContext(AppContext);

    const navigate = useNavigate();

    return <nav className=' bg-[#e91e63] py-3 fixed w-full z-50'>
        <div className='w-[90%] m-auto'>
            <div className='flex-between'>
                <h1
                    onClick={() => navigate("/")}
                    className='text-[30px] text-white font-bold cursor-pointer'
                >ATechproC</h1>
                <ul className='flex-between gap-5'>
                    <FaSearch
                        onClick={() => navigate("/search")}
                        className='cursor-pointer text-[20px]' />
                    <div className='relative '>
                        <FaCartShopping className='cursor-pointer mx-5 text-[20px]' />
                        {
                            addToCart == 0 ? <></>
                                : <div className='absolute -top-1 right-4 w-[12px] h-[12px] rounded-full bg-black text-[10px] flex-center'> {addToCart} </div>
                        }
                    </div>
                    {
                        jwt ? <div
                            onClick={() => navigate("/my-profile")}
                            className='w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer'>
                            <img className='w-full h-full object-cover'
                                src={assets.placeholder} draggable={false} />
                        </div>
                            : <button
                                onClick={() => setIsOpen(!isOpen)}
                                className='button-style'>Login</button>
                    }
                </ul>
            </div>
        </div>
    </nav>
}

export default NavBar
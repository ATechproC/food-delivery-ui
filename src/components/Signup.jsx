import React, { useContext, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import { useSignProvider } from '../providers/SignupProvider';
import axios from "axios"
import { AppContext } from '../providers/AppProvider';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify'

const Signup = () => {

    const navigate = useNavigate();

    const { isOpen, setIsOpen } = useSignProvider();

    const [isRegister, setIsRegister] = useState(false);

    const { setJwt, backendUrl } = useContext(AppContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CUSTOMER");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (isRegister) {
            try {
                const { data } = await axios.post(backendUrl + "/auth/signup", {
                    username, email, password, role
                });


                if (data.role == "RESTAURANT_OWNER") {
                    navigate("/admin/restaurant");
                }

                setJwt(data.jwt);
                localStorage.setItem("jwt", data.jwt);

                setUsername("");
                setPassword("");
                setEmail("");
                setRole("CUSTOMER");
                setIsOpen(!isOpen);
                // toast.success(message);
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
                console.log(err.response?.data?.message || err.message);
            }
        } else {
            try {
                const { data } = await axios.post(backendUrl + "/auth/login", {
                    email, password
                });

                if (data.role == "RESTAURANT_OWNER") {
                    navigate("/admin/restaurant");
                }

                setJwt(data.jwt);
                localStorage.setItem("jwt", data.jwt);
                setPassword("");
                setEmail("");
                setIsOpen(!isOpen);
                // toast.success(message);
            } catch (err) {
                toast.error(err.response?.data?.message || err.message);
                console.log(err.response?.data?.message || err.message);
            }
        }
    }
    return isOpen && <>
        <div
            onClick={() => {
                setIsOpen(!isOpen);
                setEmail("");
                setUsername("");
                setPassword("");
                setRole("CUSTOMER");
            }}
            className='fixed left-0 top-0 w-[100%] h-[100%] backdrop-blur-[5px] z-10 transition-all duration-300' />
        <form
            onSubmit={onSubmitHandler}
            className='fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-[100] w-[35%] bg-[#000000] px-6 py-7 rounded-md transition-all duration-300'>
            <FaTimes
                onClick={() => {
                    setIsOpen(!isOpen);
                    setEmail("");
                    setUsername("");
                    setPassword("");
                    setRole("CUSTOMER");
                }}
                className='absolute top-6 right-6 font-bold text-[18px] cursor-pointer' />
            <h1 className='text-[30px] font-semibold pb-5 text-center'>
                {isRegister ? "Signup" : "Login"} </h1>
            <div className=' flex flex-col gap-4'>
                {
                    isRegister && <div>
                        <input
                            className='input-style'
                            placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                }
                <div>
                    <input
                        className='input-style'
                        placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <input
                        className='input-style' type='password'
                        placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {
                    isRegister && <div className='text-center'>
                        <select
                            className='bg-[#57595B] pb-1 outline-none w-fit'
                            value={role} onChange={(e) => setRole(e.target.value)}  >
                            <option
                                className='text-center'
                                value="CUSTOMER" selected={true} >Customer</option>
                            <option
                                className='text-center'
                                value="RESTAURANT_OWNER">Restaurant owner</option>
                            <option
                                className='text-center'
                                value="ADMIN">Admin</option>
                        </select>
                    </div>
                }
                <button className='w-full bg-[#e91e63] py-2 rounded-md font-bold my-2'> {isRegister ? "Register" : "Login"} </button>
                {
                    isRegister ? <div className='text-center'>
                        Already have an account ? <span
                            className='cursor-pointer text-[#e91e63] font-bold text-[18px]'
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setEmail("");
                                setPassword("");
                            }}
                        >Login</span>
                    </div> :
                        <div className='text-center'>
                            Don't have an account ? <span className='cursor-pointer text-[#e91e63] font-bold text-[18px]' onClick={() => {
                                setIsRegister(!isRegister);
                                setEmail("");
                                setUsername("");
                                setPassword("");
                                setRole("CUSTOMER");
                            }}>Register</span>
                        </div>
                }

            </div>
        </form>
    </>
}

export default Signup
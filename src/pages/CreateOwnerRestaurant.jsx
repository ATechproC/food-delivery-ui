import React, { useState } from 'react';
import { BiSolidImageAdd } from "react-icons/bi";
import axios from "axios";
import { useContext } from 'react';
import { toast } from "react-toastify"
import { AppContext } from '../providers/AppProvider';
import AdminMenu from '../components/AdminMenu';

const CreateOwnerRestaurant = () => {

    const { backendUrl, jwt } = useContext(AppContext);

    const [isResCreated, setIsResCreated] = useState(false);

    const [address, setAddress] = useState({
        streetAddress: "",
        stateProvince: "",
        city: "",
        country: ""
    });

    const [contactInformation, setContactInformation] = useState({
        mobile: "",
        email: "",
        twitter: "",
        instagram: "",
    })

    const [image, setImage] = useState("");

    const [inputsValue, setInputsValue] = useState({
        "name": "",
        "description": "",
        "title": "",
        "cuisineType": "",
        "openingHours": "11:30:00",
        "numRating": 4,
        "images": [
            "https://example.com/images/spicegarden1.jpg",
            "https://example.com/images/spicegarden2.jpg"
        ],
        "registrationDate": "2026-02-12T14:00:00",
        "open" : false
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            if (!image) alert("Image not selected");

            const { data } = await axios.post(backendUrl + "/admin/restaurant/create-restaurant", {
                ...inputsValue,
                address,
                contactInformation
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            toast.success(data.message);
            setIsResCreated(true);
            console.log(data)

        } catch (error) {
            console.log(error);
        }
    }

    return !isResCreated ? <div className='w-[80%] mx-auto p-10'>
        <h2 className='text-[35px] font-bold text-center'>Add New Restaurant</h2>
        <form
            onSubmit={onSubmitHandler}
            className='pt-8 flex flex-col gap-3'>
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
                <input onChange={(e) => { setImage(e.target.files[0]) }}
                    id="image" type='file' hidden={true} />
            </div>
            <input value={inputsValue.name}
                onChange={(e) => setInputsValue({ ...inputsValue, name: e.target.value })} required
                placeholder='Name' className='w-full input-style rounded-md' />
            <input value={inputsValue.title}
                onChange={(e) => setInputsValue({ ...inputsValue, title: e.target.value })} required
                placeholder='Title' className='w-full input-style rounded-md' />
            {/* <input value={inputsValue.openingHours}
                onChange={(e) => setInputsValue({ ...inputsValue, openingHours: e.target.value })} required
                placeholder='Opening hours' className='w-full input-style rounded-md' /> */}
            <input value={inputsValue.description}
                onChange={(e) => setInputsValue({ ...inputsValue, description: e.target.value })} required placeholder='Description' className='w-full input-style rounded-md' />
            <div className='flex-items gap-3'>
                <input value={inputsValue.cuisineType}
                    onChange={(e) => setInputsValue({ ...inputsValue, cuisineType: e.target.value })} required placeholder='Cuisine type' className='w-full input-style rounded-md' />
                {/* <input value={inputsValue.date}
                    onChange={(e) => setInputsValue({ ...inputsValue, date: e.target.value })} required type='date' placeholder='date' className='w-full input-style rounded-md' /> */}
            </div>
            <input value={address.streetAddress}
                onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })} required placeholder='Street address' className='w-full input-style rounded-md' />
            <div className='flex-items gap-3'>
                <input value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })} required placeholder='City' className='w-full input-style rounded-md' />
                <input value={address.stateProvince}
                    onChange={(e) => setAddress({ ...address, stateProvince: e.target.value })} required placeholder='State Province' className='w-full input-style rounded-md' />
                <input value={inputsValue.postalCode}
                    onChange={(e) => setInputsValue({ ...inputsValue, postalCode: e.target.value })} required placeholder='Postal code' className='w-full input-style rounded-md' />
            </div>
            <input value={inputsValue.country}
                onChange={(e) => setInputsValue({ ...inputsValue, country: e.target.value })} required placeholder='Country' className='w-full input-style rounded-md' />
            <div className='flex-items gap-3'>
                <input value={contactInformation.email}
                    onChange={(e) => setContactInformation({ ...contactInformation, email: e.target.value })} required type='email' placeholder='Email' className='w-full input-style rounded-md' />
                <input value={contactInformation.mobile}
                    onChange={(e) => setContactInformation({ ...contactInformation, mobile: e.target.value })} required placeholder='Mobile' className='w-full input-style rounded-md' />
            </div>
            <div className='flex-items gap-3'>
                <input value={contactInformation.twitter}
                    onChange={(e) => setContactInformation({ ...contactInformation, twitter: e.target.value })} required placeholder='Twitter' className='w-full input-style rounded-md' />
                <input value={contactInformation.instagram}
                    onChange={(e) => setContactInformation({ ...contactInformation, instagram: e.target.value })} required placeholder='Instagram' className='w-full input-style rounded-md' />
            </div>
            <button
                // onClick={() => setIsResCreated(true)}
                type='submit' className='input-style bg-[#e91e63] text-white w-fit rounded-md'>CREATE RESTAURANT</button>
        </form>
    </div> : <>
        <AdminMenu />
    </>
}

export default CreateOwnerRestaurant
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../providers/AppProvider';
import axios from 'axios';
import AdminMenu from '../components/AdminMenu';

const Details = () => {

    // const [isOpen, setIsOpen] = useState(false);

    const { backendUrl, jwt } = useContext(AppContext);

    const [resDetails, setResDetails] = useState({});

    const fetchRestaurantDetails = async () => {
        try {

            const { data : { data } } = await axios.get(
                backendUrl + "/admin/restaurant/by-user", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setResDetails(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const [ownerProfile, setOwnerProfile] = useState({})

    const fetchOwnerProfile = async () => {
        try {

            const { data: { data } } = await axios.get(backendUrl + "/users/profile", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setOwnerProfile(data);
            console.log(data);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchRestaurantDetails();
        fetchOwnerProfile();
    }, []);

    const [isResOpen, setIsResOpen ] = useState(true);

    const handleUpdateResStatus = async (id) => {
        try {
            await axios.put(backendUrl + "/admin/restaurant/update-status?resId=" + id, {}, {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
            setIsResOpen(!isResOpen);
        } catch (error) {
            console.log(error);
        }
    }

    return <div className='flex-items gap-20'>
            <AdminMenu />
            <div className='w-full text-center'>
                <div className='flex-items gap-5 w-fit mx-auto pt-10'>
                    <h2 className='text-[50px] font-bold mx-auto '> {resDetails?.name} </h2>
                    <button
                        onClick={() => handleUpdateResStatus(resDetails.id) }
                        style={{ backgroundColor: !isResOpen ? "green" : "red" }}
                        className='input-style text-white w-fit rounded-xl'> {!isResOpen ? "Open" : "Close"}</button>
                </div>
                <div className='bg-gray-900 p-3 m-3 rounded-lg'>
                    <p className='pl-5 text-[20px] font-semibold text-start'>Restaurant</p>
                    <div className='flex flex-col gap-3 w-[35%] p-4'>
                        <div className='flex-between gap-3'>
                            <p className='font-bold'>Owner</p>
                            <p className=''> {ownerProfile?.username} </p>
                        </div>
                        <div className='flex-between gap-3'>
                            <p className='font-bold'>Restaurant name</p>
                            <p>{resDetails.name}</p>
                        </div>
                        <div className='flex-between gap-3'>
                            <p className='font-bold'>Cuisine type</p>
                            <p> {resDetails?.cuisineType} </p>
                        </div>
                        <div className='flex-between gap-3'>
                            <p className='font-bold'>Opening hours</p>
                            <p>{resDetails?.openingHours}</p>
                        </div>
                        <div className='flex-between gap-3'>
                            <p className='font-bold'>Status</p>
                            <p style={{ backgroundColor: isResOpen ? "green" : "red" }}
                                className=' px-2 py-1 rounded-xl cursor-default'>
                                {!isResOpen ? "Close" : "Open"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex-items gap-2'>
                    <div className='bg-gray-900 p-3 m-3 rounded-lg w-1/2'>
                        <p className='pl-4 text-[20px] font-semibold text-start'>Address</p>
                        <div className='flex flex-col gap-2 p-4'>
                            <div className='flex-between gap-3'>
                                <p className='font-bold'>Country</p>
                                <p className=''> {resDetails?.address?.country} </p>
                            </div>
                            <div className='flex-between gap-3'>
                                <p className='font-bold'>City</p>
                                <p>{resDetails?.address?.city}</p>
                            </div>
                            {/* <div className='flex-between gap-3'>
                            <p className='font-bold'>Postal code</p>
                            <p>Owner name</p>
                        </div> */}
                        </div>
                    </div>
                    <div className='bg-gray-900 p-3 m-3 rounded-lg w-1/2'>
                        <p className='pl-4 text-[20px] font-semibold text-start'>Contact</p>
                        <div className='flex flex-col gap-2 p-4'>
                            <div className='flex-between gap-3'>
                                <p className='font-bold'>Email</p>
                                <p className=''> {resDetails?.contactInformation?.email} </p>
                            </div>
                            <div className='flex-between gap-3'>
                                <p className='font-bold'>Mobile</p>
                                <p> {resDetails?.contactInformation?.mobile} </p>
                            </div>
                            <div className='flex-between gap-3'>
                                <p className='font-bold'>Social</p>
                                <p> {resDetails?.contactInformation?.instagram} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default Details
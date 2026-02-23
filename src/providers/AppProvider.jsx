import axios from 'axios';
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const [ jwt, setJwt ] = useState(localStorage.getItem("jwt") ? localStorage.getItem("jwt") : "");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [resId, setResId] = useState(1);

    const [userProfile, setUserProfile] = useState({});

    const fetchUserProfile = async () => {
        try {

            const { data : { data}} = await axios.get(backendUrl + "/users/profile", {
                headers : {
                    Authorization : `Beare ${jwt}`
                }
            })

            setUserProfile(data);
            
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return <AppContext.Provider value={{jwt, setJwt, backendUrl, resId, setResId, userProfile, fetchUserProfile}}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;
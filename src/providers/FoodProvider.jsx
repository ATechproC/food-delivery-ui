import axios from 'axios';
import React, { useState, createContext, useContext } from 'react';
import { toast } from "react-toastify";
import { AppContext } from './AppProvider';

// eslint-disable-next-line react-refresh/only-export-components
export const FoodContext = createContext({});

const FoodProvider = ({children}) => {

    const [ foodItems, setFoodItems ] = useState([]);

    const { backendUrl, jwt} = useContext(AppContext);

    const fetchFoodItems = async () => {
        try {

            const { data : { data }} = await axios.get(backendUrl + "/food/restaurant/get-all", {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
            setFoodItems(data);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.log(error.response?.data?.message || error.message);
        }
    }

    return <FoodContext value={{foodItems, fetchFoodItems}}>
        {children}
    </FoodContext>
}

export default FoodProvider
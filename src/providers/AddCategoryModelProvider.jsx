import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { AppContext } from './AppProvider';

// eslint-disable-next-line react-refresh/only-export-components
export const AddCategoryModelContext = createContext({});

const AddCategoryModelProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    const { backendUrl, jwt } = useContext(AppContext);

    const [foodCategories, setFoodCategories] = useState([]);

    const fetchAllFoodCategories = async () =>{
        try {
            const { data: { data } } = await axios.get(backendUrl + "/categories/restaurant", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setFoodCategories(data);
            console.log(data);
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }

    return <AddCategoryModelContext.Provider value={{ isOpen, setIsOpen, fetchAllFoodCategories, foodCategories }}>
        {children}
    </AddCategoryModelContext.Provider>
}

export default AddCategoryModelProvider
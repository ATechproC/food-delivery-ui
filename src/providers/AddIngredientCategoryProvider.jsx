import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { AppContext } from './AppProvider';

// eslint-disable-next-line react-refresh/only-export-components
export const AddIngredientCategoryContext = createContext({});

const AddIngredientCategoryProvider = ({children}) => {

    const [isCategorytModelOpen, setIsCategoryModelOpen] = useState(false);

    const { backendUrl, jwt} = useContext(AppContext);

    const [ingredientCategories, setIngredientCategories ] = useState([]);

    const fetchIngredientCategoies = async () => {
        try {
            
            const { data : { data } } = await axios.get(backendUrl + "/ingredients/restaurant", {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })

            setIngredientCategories(data);
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    } 

    return <AddIngredientCategoryContext.Provider value={{isCategorytModelOpen, setIsCategoryModelOpen, fetchIngredientCategoies, ingredientCategories}}>
        {children}
    </AddIngredientCategoryContext.Provider>
}

export default AddIngredientCategoryProvider
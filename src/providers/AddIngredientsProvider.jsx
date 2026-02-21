import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { AppContext } from './AppProvider';

// eslint-disable-next-line react-refresh/only-export-components
export const AddIngredientsContext = createContext({});

const AddIngredientsProvider = ({ children }) => {

    const [isIngredientModelOpen, setIsIngredientModelOpen] = useState(false);

    const { backendUrl, jwt} = useContext(AppContext);

    const [ingredients, setIngredients] = useState([]);

    const fetchIngrdients = async () => {
        try {

            const { data : { data }} = await axios.get(backendUrl + "/ingredient-items/restaurant", {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })

            setIngredients(data);

        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }

    return <AddIngredientsContext.Provider value={{ isIngredientModelOpen, setIsIngredientModelOpen, fetchIngrdients, ingredients }}>
        {children}
    </AddIngredientsContext.Provider>
}

export default AddIngredientsProvider
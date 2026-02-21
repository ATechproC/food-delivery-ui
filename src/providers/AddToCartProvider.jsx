import React, { useState } from 'react';
import { createContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AddToCartContext = createContext({});

export const AddToCartProvider = ({children}) => {

    const [addToCart, setAddToCart ] = useState(0);

    return <AddToCartContext.Provider value={{addToCart, setAddToCart}}>
        {children}
    </AddToCartContext.Provider>
}

export default AddToCartProvider
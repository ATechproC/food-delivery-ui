import React, { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const CartModelContext = createContext({})

const CartModelProvider = ({ children }) => {

    const [ isOpen, setIsOpen ] = useState(false);

    return <CartModelContext.Provider value={{isOpen, setIsOpen}}>
        {children}
    </CartModelContext.Provider>
}

export default CartModelProvider;
import React, { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const InputsContext = createContext({});

const IngredientsInputsProvider = ({ children }) => {

    const [selectedIngredientsItems, setSelectedIngredientsItems] = useState([]);

    return <InputsContext.Provider value={{
        selectedIngredientsItems, setSelectedIngredientsItems
    }}>
        {children}
    </InputsContext.Provider>
}

export default IngredientsInputsProvider
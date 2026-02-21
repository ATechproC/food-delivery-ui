import React, { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const [ jwt, setJwt ] = useState(localStorage.getItem("jwt") ? localStorage.getItem("jwt") : "");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return <AppContext.Provider value={{jwt, setJwt, backendUrl}}>
        {children}
    </AppContext.Provider>
}

export default AppProvider
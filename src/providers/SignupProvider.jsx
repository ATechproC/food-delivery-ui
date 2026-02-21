import React, { createContext, useContext, useState } from 'react';

const SignupContext = createContext({});

const SignupProvider = ({ children }) => {

    const [ isOpen, setIsOpen ] = useState(false);

    return <SignupContext.Provider value={{isOpen, setIsOpen}} >
        {children}
    </SignupContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSignProvider = () => useContext(SignupContext);

export default SignupProvider;

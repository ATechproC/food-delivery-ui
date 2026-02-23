import React, { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UpdateStatusContext = createContext({});

const UpdateStatusProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [orderId, setOrderId] = useState(1);

    return <UpdateStatusContext.Provider value={{ isOpen, setIsOpen, orderId, setOrderId }}>
        {children}
    </UpdateStatusContext.Provider>
}

export default UpdateStatusProvider
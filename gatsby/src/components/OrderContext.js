import React, { useState } from 'react';

// Create a order Context
const OrderContext = React.createContext();

export function OrderProvider({ children}){
    // 
    const [order, setOrder] = useState([]);
    return <OrderContext.Provider value={[order, setOrder]}>
        { children}
    </OrderContext.Provider>
}

export default OrderContext;


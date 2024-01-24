/* eslint-disable react/prop-types */
//! Imported Libraries -------------------------
import { createContext, useState, useEffect } from 'react';
//! --------------------------------------------

//! Imported Components/Variables---------------
//! --------------------------------------------

export const CartWishlistContext = createContext();

export default function CartWishlistContextProvider({children}) {
    const [tempCart, setTempCart] = useState([]);
    const [cartItemId, setCartItemId] = useState(null);
    const [localCart, setLocalCart] = useState([]);
    const [visible, setVisible] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    
    useEffect(() => {
        const launchCart = localStorage.getItem('cart');
        if (launchCart) {
            setTempCart(JSON.parse(launchCart));
            setLocalCart(JSON.parse(launchCart));
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }, [])
    
    return (
        <CartWishlistContext.Provider
            value={{
                tempCart,
                setTempCart,
                cartItemId,
                setCartItemId,
                localCart,
                setLocalCart,
                visible,
                setVisible,
                subTotal,
                setSubTotal
            }}>
            {children}
        </CartWishlistContext.Provider>
    )
}
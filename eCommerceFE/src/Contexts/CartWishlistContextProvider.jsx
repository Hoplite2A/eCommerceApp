/* eslint-disable react/prop-types */
//! Imported Libraries -------------------------
import { createContext, useState, useEffect } from 'react';
// import { redirect } from 'react-router-dom';
//! --------------------------------------------

//! Imported Components/Variables---------------
//! --------------------------------------------

export const CartWishlistContext = createContext();

export default function CartWishlistContextProvider({children}) {
    const [allItems, setAllItems] = useState([]);
    const [allItemsAdmin, setAllItemAdmin] = useState(true);
    const [tempCart, setTempCart] = useState([]);
    const [localCart, setLocalCart] = useState([]);
    const [tempWishlist, setTempWishlist] = useState([]);
    const [localWishlist, setLocalWishlist] = useState([]);
    const [visible, setVisible] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [wishlistSubTotal, setWishlistSubTotal] = useState(0);
    
    useEffect(() => {
        const launchCart = localStorage.getItem('cart');
        if (launchCart) {
            setTempCart(JSON.parse(launchCart));
            setLocalCart(JSON.parse(launchCart));
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    }, [])
    
    useEffect(() => {
        const launchWishlist = localStorage.getItem('wishlist');
        if (launchWishlist) {
            setTempWishlist(JSON.parse(launchWishlist));
            setLocalWishlist(JSON.parse(launchWishlist));
        } else {
            localStorage.setItem('wishlist', JSON.stringify([]));
        }
    }, [])

    return (
        <CartWishlistContext.Provider
            value={{
                allItems, 
                setAllItems,
                allItemsAdmin,
                setAllItemAdmin,
                tempCart,
                setTempCart,
                localCart,
                setLocalCart,
                tempWishlist,
                setTempWishlist,
                localWishlist,
                setLocalWishlist,
                visible,
                setVisible,
                subTotal,
                setSubTotal,
                wishlistSubTotal,
                setWishlistSubTotal
            }}>
            {children}
        </CartWishlistContext.Provider>
    )
}
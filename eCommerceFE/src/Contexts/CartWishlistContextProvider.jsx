//! Imported Libraries -------------------------
import { createContext, useState } from 'react';
//! --------------------------------------------

//! Imported Components/Variables---------------
//! --------------------------------------------

export const CartWishlistContext = createContext();

export default function CartWishlistContextProvider({children}) {
    const [tempCart, setTempCart] = useState([]);
    const [cartItemId, setCartItemId] = useState(null);
    const [tempCountCart, setTempCountCart] = useState(0);
    const [localCart, setLocalCart] = useState([]);
    
    return (
        <CartWishlistContext.Provider value={{tempCart, setTempCart, cartItemId, setCartItemId, tempCountCart, setTempCountCart, localCart, setLocalCart}}>
            {children}
        </CartWishlistContext.Provider>
    )
}
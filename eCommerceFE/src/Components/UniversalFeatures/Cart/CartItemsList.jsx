//! Imported Libraries --------------------------
import { useState, useSignal } from 'react';
import { signals } from '@preact/signals-react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { cartCount, setCartCount } from '../../MainPages/IndividualItemTiles';
import { cartList, setCartList } from '../../MainPages/AllItems';
//! ---------------------------------------------

export default function CartItemsList() {
    
    const removeItem = () => {
        setCartList(
            cartList.filter(cartItem =>
                cartItem.id !== cartItem.id
            )
        );
    }
    
    return (<>
        <div className="cartListItemTile">
            
        </div>
    </>)
}

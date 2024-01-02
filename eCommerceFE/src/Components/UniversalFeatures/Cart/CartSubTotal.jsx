//! Imported Libraries --------------------------
import { useState, useSignal } from 'react';
import { signals } from '@preact/signals-react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { cartCount, setCartCount } from '../../MainPages/IndividualItemTiles';
import { cartList, setCartList } from '../../MainPages/AllItems';
//! ---------------------------------------------

export default function CartSubTotal({cartList}) {
    
    const [subTotal, setSubTotal] = useSignal(0);

    

    return (<>

    </>)
}
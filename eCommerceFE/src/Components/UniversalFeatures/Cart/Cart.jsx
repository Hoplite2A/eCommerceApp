//! Imported Libraries --------------------------
import { useState, useSignal } from 'react';
import { signals } from '@preact/signals-react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { cartCount, setCartCount } from '../../MainPages/IndividualItemTiles';
import { cartList, setCartList } from '../../MainPages/AllItems';
//! ---------------------------------------------


export default function Cart() {

    //*Creating visible state vairable to determine if this component is visible
    //* in the Header.
    const [visible, setVisible] = useSignal(false);

    if (cartCount && cartList !== null) {
        setVisible(true);
    }

    return (<>
        {visible ? 
            <>
                <div className="cartPageDiv">
                    
                </div>
            </> :
            <></>
        }

    </>)   
}
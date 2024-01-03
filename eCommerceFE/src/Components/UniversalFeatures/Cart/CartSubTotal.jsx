//! Imported Libraries --------------------------
import { useState, useEffect } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { cartList } from '../../MainPages/AllItems';
//! ---------------------------------------------

export default function CartSubTotal() {
    
    //TODO ---- Create subtotal function against the method -------------------
    const priceArray = [];
    const [cartSubTotal, setCartSubTotal] = useState(0);

    useEffect((cartList) => {
        cartList.map((individualPrice) => {
            priceArray.push(individualPrice.price * individualPrice.quantity);
        })
        setCartSubTotal(priceArray.reduce(function (a, b) {
            return a + b;
        }, 0)
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartList])


    return (<>
        <div className="cartSubTotal">
            <p className="cartSubTotalText">{cartSubTotal}</p>
        </div>
    </>)
}
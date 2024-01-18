//! Imported Libraries --------------------------
import { useState, useEffect } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { dbCart } from '../../../App';
//! ---------------------------------------------

export default function CartSubTotal() {
    
    const cartList = dbCart.value;

    // let testTotal = 2 * "109.95";
    // console.log(testTotal);

    //TODO ---- Create subtotal function against the method -------------------
    const [cartSubTotal, setCartSubTotal] = useState(0);
    
    useEffect((cartList) => {
        const priceArray = [];
        if (cartList) {
            cartList.map((individualPrice) => {
                let itemPrice = individualPrice.price;
                let quantity = individualPrice.quantity;
                let individualTotal = (itemPrice * quantity);
                priceArray.push(individualTotal);
            });
            const tempPriceArray = priceArray.reduce((a, b) => a + b);
            setCartSubTotal(tempPriceArray);
        } 
    }, [cartList])

    console.log(cartSubTotal);

    return (<>
        {cartSubTotal ? <>
            <div className="cartSubTotal">
                <p className="cartSubTotalText">{cartSubTotal}</p>
            </div>
        </> : <>
        </>}
    </>)
}
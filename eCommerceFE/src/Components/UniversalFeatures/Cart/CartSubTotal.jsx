//! Imported Libraries --------------------------
import { useState, useEffect } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
//! ---------------------------------------------

export default function CartSubTotal(localCart) {
  const localSubTotal = localCart.localCart;

    //TODO ---- Create subtotal function against the method -------------------
    const [cartSubTotal, setCartSubTotal] = useState([]);
    
    useEffect(() => {
    if (localSubTotal) {
      const priceArray = localSubTotal.map((individualPrice) => {
        let itemPrice = individualPrice.price * individualPrice.quantity;
        return itemPrice; // Return the individual total
      });

      const tempPriceArray = priceArray.reduce((a, b) => a + b, 0);
        const roundedArray = Math.round(tempPriceArray * 10 ** 2) / 10 ** 2;
      setCartSubTotal(roundedArray);
    }
  }, [localSubTotal]);

    return (<>
        {cartSubTotal ? <>
            <div className="cartSubTotal">
                <p className="cartSubTotalText">Cart Total: ${cartSubTotal}</p>
            </div>
        </> : <>
        </>}
    </>)
}
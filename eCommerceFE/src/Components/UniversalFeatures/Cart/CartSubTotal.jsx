//! Imported Libraries --------------------------
import {useEffect, useContext } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from '../../../Contexts/CartWishlistContextProvider';
//! ---------------------------------------------

export default function CartSubTotal(localCart) {

  const { subTotal, setSubTotal } = useContext(CartWishlistContext);
  
  const localSubTotal = localCart.localCart;

    useEffect(() => {
    if (localSubTotal) {
      const priceArray = localSubTotal.map((individualPrice) => {
        let itemPrice = individualPrice.price * individualPrice.quantity;
        return itemPrice; // Return the individual total
      });

      const tempPriceArray = priceArray.reduce((a, b) => a + b, 0);
        const roundedArray = Math.round(tempPriceArray * 10 ** 2) / 10 ** 2;
        setSubTotal(roundedArray);
      }
  }, [localSubTotal]);

    return (<>
        {subTotal ? <>
            <div className="cartSubTotal">
                <p className="cartSubTotalText">Cart Total: ${subTotal}</p>
            </div>
        </> : <>
        </>}
    </>)
}
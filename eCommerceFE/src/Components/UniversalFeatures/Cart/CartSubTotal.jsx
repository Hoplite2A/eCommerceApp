//! Imported Libraries --------------------------
import { useState, useEffect, useContext } from 'react';
import { CartWishlistContext } from '../../../Contexts/CartWishlistContextProvider';
//! ---------------------------------------------

//! Imported Components/Variables----------------
//! ---------------------------------------------

export default function CartSubTotal() {
    
    const { localCart } = useContext(CartWishlistContext);
    console.log(`CartSubTotal Component`);
    console.log(localCart);
    //TODO ---- Create subtotal function against the method -------------------
    const [cartSubTotal, setCartSubTotal] = useState([]);
    
    useEffect(() => {
    if (localCart) {
      const priceArray = localCart.map((individualPrice) => {
        let itemPrice = individualPrice.price;
        let quantity = individualPrice.quantity;
        return itemPrice * quantity; // Return the individual total
      });

      const tempPriceArray = priceArray.reduce((a, b) => a + b, 0);
        const roundedArray = Math.round(tempPriceArray * 10 ** 2) / 10 ** 2;
      setCartSubTotal(roundedArray);
    }
  }, [localCart]);

    console.log(cartSubTotal);

    return (<>
        {cartSubTotal ? <>
            <div className="cartSubTotal">
                <p className="cartSubTotalText">Cart Total: {cartSubTotal}</p>
            </div>
        </> : <>
        </>}
    </>)
}
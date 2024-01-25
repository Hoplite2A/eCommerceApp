//! Imported Libraries --------------------------
import { useEffect, useContext } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from '../../Contexts/CartWishlistContextProvider';
//! ---------------------------------------------

export default function WishlistSubTotalComp(localWishlist) {
  
  const { wishlistSubTotal, setWishlistSubTotal } = useContext(CartWishlistContext);
  const localWishlistSubTotal = localWishlist.localWishlist;

  useEffect(() => {
  if (localWishlistSubTotal) {
    const priceArray = localWishlistSubTotal.map((individualPrice) => {
      let itemPrice = individualPrice.price * individualPrice.quantity;
      return itemPrice;
    });

    const tempPriceArray = priceArray.reduce((a, b) => a + b, 0);
      const roundedArray = Math.round(tempPriceArray * 10 ** 2) / 10 ** 2;
      setWishlistSubTotal(roundedArray);
    }
  }, [localWishlist])

    return (<>
        {wishlistSubTotal ? <>
            <div className="cartSubTotal">
                <p className="cartSubTotalText">Cart Total: ${wishlistSubTotal}</p>
            </div>
        </> : <>
        </>}
    </>)
}
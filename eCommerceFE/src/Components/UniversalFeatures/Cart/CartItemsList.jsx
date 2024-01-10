//! Imported Libraries --------------------------
import { useSignal, useState } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
//! ---------------------------------------------

export default function CartItemsList({key, cartListItem}) {

  // const { image, title, price, description, qunatity} = cartListItem;

  // //*Setting cart count for cart logo in Header to show RealTime Cart Count value.
  // setCartCoumt(cartCount - quantity)

  // const updateCartQuantity = (e) => {
  //   setCartCount(cartCount + (quantity));
  //   setItemQuant(e.target.value);
  // }

  // const removeItem = () => {

  //   const updatedCartValue = [...tempCart, item ];
  //   setTempCart(updatedCartValue);
  //   localStorage.setItem('cart', JSON.stringify(updatedCartValue));
  // }

  return (
    <>
      {/* <div className="cartListItemTile">
        <div className="cartListItemImage">
          <img src={image} alt="" />
        </div>
        <div className="cartListItemDetails">
          <p className="cartListItemTitle">{title}</p>
          <p className="cartListItemPrice">{price}</p>
          <p className="cartItemListDescription">{description}</p>
        </div>
        <div className="cartListItemButtonSelector">
          <label>Qty:
            <input id="quantity" type="number" placeholder={quantity} min={1} max={1000000} onChange={updateCartQuantity(e.target.value)}/>
          </label>
          <button className="removeItem">Remove</button>
        </div>
      </div> */}
    </>
  );
}

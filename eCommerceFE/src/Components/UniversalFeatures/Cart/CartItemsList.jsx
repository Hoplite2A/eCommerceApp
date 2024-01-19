//! Imported Libraries --------------------------
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
//! ---------------------------------------------

export default function CartItemsList({cartListItem}) {
  console.log('CartItemsList Component');
  console.log(cartListItem);
  //*Possible prop drilling: , tempCart, setTempCart
  
  const { image, title, price, description, quantity} = cartListItem;

  // //*Setting cart count for cart logo in Header to show RealTime Cart Count value.
  // setCartCoumt(cartCount - quantity)

  // const updateCartQuantity = (e) => {
  //   setCartCount(cartCount + (quantity));
  //   setItemQuant(e.target.value);
  // }

  // const removeItem = (id) => {
    
  // }

  return (
    <>
      <div className="cartListItemTile">
        <div className="cartListItemImage">
          <img src={image} alt="" />
        </div>
        <div className="cartListItemTileRight">
          <div className="cartListItemDetails">
            <div className="titlePrice">
              <div className="titlePriceSubDivTitle">
                <p className="cartListItemTitle">{title}</p> 
              </div>
              <div className="titlePriceSubDivPrice">
                <p className="cartListItemPrice">{price}</p>
              </div>
            </div>
            {/* <div className="description">
              <p className="cartItemListDescription">{description}</p>
            </div> */}
          </div>
          <div className="cartListItemButtonSelector">
            <label className="cartListItemQuantity">Qty:
              <input className="cartListItemQuantity" id="quantity" type="number" placeholder={quantity} min={1} max={1000000} />
              {/* //TODO -----------------------------Add Event Listener for input/change to quantity and then update CartListItem.quantity &&
              //TODO ---------------------------------then update TempCart */}
            </label>
            <button className="removeItem" >Remove</button>
          </div>
        </div>
      </div>
    </>
  );
}

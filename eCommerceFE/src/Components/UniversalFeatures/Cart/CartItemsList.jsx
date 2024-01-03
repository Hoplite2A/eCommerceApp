//! Imported Libraries --------------------------
import { useSignal, useState } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { cartList, setCartList } from "../../MainPages/AllItems";
import { cartCount } from './Cart';
//! ---------------------------------------------

export default function CartItemsList({key, cartItem}) {

  const { image, title, price, description, quantity} = cartItem;

  const [itemQuant, setItemQuant] = useState(quantity)

  //*Initializing CartQuantity for future calculations.
  setCartCount(quantity);

  const removeItem = () => {
    setCartList(cartList.filter((cartItem) => cartItem.id !== cartItem.id));
    
    //*Setting cart count for cart logo in Header to show RealTime Cart Count value.
    setCartCoumt(cartCount - quantity)
  };

  const updateCartQuantity = (e) => {
    setCartCount(cartCount + (quantity));
    setItemQuant(e.target.value);
  }

  return (
    <>
      <div className="cartListItemTile">
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
            <input id="quantity" type="number" placeholder={itemQuant} min={1} max={1000000} onChange={updateCartQuantity(e.target.value)}/>
          </label>
          <button className="removeItem" onClick={removeItem}>Remove</button>
        </div>
      </div>
    </>
  );
}

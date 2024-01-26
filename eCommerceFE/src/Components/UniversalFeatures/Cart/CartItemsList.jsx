//! Imported Libraries --------------------------
import { useContext, useState, useEffect } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function CartItemsList({cartListItem}) {
  
  const { image, title, price, quantity, id} = cartListItem;
  const { setTempCart, localCart, setLocalCart } = useContext(CartWishlistContext);
  
  // //*Setting cart count for cart logo in Header to show RealTime Cart Count value.
  //TODO -------------- UPDATE QUANTITY

  //TODO -------------- REMOVE BUTTON
  
  const [testItem, setTestItem] = useState([]);
 
  const remove = () => {
    const editableCart = localCart.filter((item) => item.id !== id);
    setTestItem(editableCart);
    setTempCart(editableCart);
    setLocalCart(editableCart);
    localStorage.setItem('cart', JSON.stringify(editableCart));
  }

  console.log(testItem);

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
            <button className="removeItem" onClick={() => remove()}>Remove</button>
          </div>
        </div>
      </div>
    </>
  );
}

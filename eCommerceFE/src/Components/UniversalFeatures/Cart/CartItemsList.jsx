//! Imported Libraries --------------------------
import { useContext, useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function CartItemsList({ cartListItem }) {
  console.log({ cartListItem });

  const { image, title, price, quantity, id } = cartListItem;
  const { tempCart, setTempCart, localCart, setLocalCart } =
    useContext(CartWishlistContext);

  // //*Setting cart count for cart logo in Header to show RealTime Cart Count value.
  //TODO -------------- UPDATE QUANTITY

  //TODO -------------- REMOVE BUTTON

  const [newQuantity, setNewQuantity] = useState(0);
  const updateQuantity = () => {
    const requiredItem = tempCart.find((item) => item.id == id);
    requiredItem.quantity = newQuantity * 1;
    const requiredCartItems = tempCart.filter((item) => item.id !== id);
    setTempCart([...requiredCartItems, requiredItem]);
    setLocalCart([...requiredCartItems, requiredItem]);
    localStorage.setItem(
      "cart",
      JSON.stringify([...requiredCartItems, requiredItem])
    );
  };

  const remove = () => {
    const editableCart = localCart.filter((item) => item.id !== id);
    setTempCart(editableCart);
    setLocalCart(editableCart);
    localStorage.setItem("cart", JSON.stringify(editableCart));
  };

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
                <p className="cartListItemPrice">${price}</p>
              </div>
            </div>
            {/* <div className="description">
              <p className="cartItemListDescription">{description}</p>
            </div> */}
          </div>
          <div className="cartListItemButtonSelector">
            <label className="cartListItemQuantity">
              Qty:
              <input
                className="cartListItemQuantity"
                id="quantity"
                type="number"
                placeholder={quantity}
                min={1}
                max={1000000}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
            </label>
            <button
              className="updateWishlistQuantity"
              onClick={() => updateQuantity()}
            >
              Update
            </button>
            <button className="removeItem" onClick={() => remove()}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

//! Imported Libraries --------------------------
import { useContext, useState } from "react";
//! ---------------------------------------------
//! Imported Components/Variables----------------
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function CartItemsList({ cartListItem, itemId }) {
  const { image, title, price, quantity, product_id } = cartListItem;
  const [newQuantity, setNewQuantity] = useState(quantity);
  const { cart, setCart } = useContext(CartWishlistContext);
  // const { tempCart, setTempCart, localCart, setLocalCart, setCheckoutCart } =
  //   useContext(CartWishlistContext);

  // //*Setting cart count for cart logo in Header to show RealTime Cart Count value.
  //TODO -------------- UPDATE QUANTITY

  //TODO -------------- REMOVE BUTTON;
  function updateQuantity() {
    // console.log({ id });
    const itemIndex = cart.findIndex((item) => item.product_id === itemId);
    if (itemId !== -1) {
      const updateCart = [...cart];
      updateCart[itemIndex].quantity = newQuantity;
      setCart(updateCart);
    } else {
      console.log("Error in updateCart");
    }
// export default function CartItemsList({cartListItem}) {

//   const { image, title, price, quantity, id } = cartListItem;
//   const { tempCart, setTempCart, localCart, setLocalCart } = useContext(CartWishlistContext);


    // const requiredItem = cart.find((item) => item.id == id);
    // requiredItem.quantity = newQuantity;
    // const requiredCartItems = cart.filter((item) => item.id !== id);
    // setCart([...requiredCartItems, requiredItem]);
    // setTempCart([...requiredCartItems, requiredItem]);
    // setLocalCart([...requiredCartItems, requiredItem]);
    // setCheckoutCart([...requiredCartItems, requiredItem]);
    // localStorage.setItem(
    //   "cart",
    //   JSON.stringify([...requiredCartItems, requiredItem])
    // );
  }

  const remove = () => {
    const editableCart = cart.filter((item) => item.product_id !== itemId);
    setCart(editableCart);
    // setTempCart(editableCart);
    // setLocalCart(editableCart);
    // setCheckoutCart(editableCart);
    // localStorage.setItem("cart", JSON.stringify(editableCart));
  };

  // function remove(e) {
  //   console.log(e.target.value);
  //   console.log(e.target.value.cartListItem);
  //   console.log(e.target.value.cartListItem);
  //   console.log(cart.findIndex(e.target.value));
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
              className="updateCartQuantity"
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

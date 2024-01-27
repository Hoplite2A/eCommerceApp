//! Imported Libraries --------------------------
import { useState, useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function AccountDetailWishlistItems(item) {
  const {
    tempCart,
    setTempCart,
    setLocalCart,
    tempWishlist,
    setTempWishlist,
    localWishlist,
    setLocalWishlist,
  } = useContext(CartWishlistContext);

  const subItem = item.item;
  const { title, image, price, quantity, id } = subItem;

  const [newQuantity, setNewQuantity] = useState(0);
  const updateQuantity = () => {
    const requiredItem = tempWishlist.find((item) => item.id == id);
    requiredItem.quantity = newQuantity * 1;
    const requiredCartItems = tempWishlist.filter((item) => item.id !== id);
    setTempWishlist([...requiredCartItems, requiredItem]);
    setLocalWishlist([...requiredCartItems, requiredItem]);
    localStorage.setItem(
      "wishlist",
      JSON.stringify([...requiredCartItems, requiredItem])
    );
  };

  const remove = () => {
    const editableWishlist = localWishlist.filter((item) => item.id !== id);
    setTempWishlist(editableWishlist);
    setLocalWishlist(editableWishlist);
    localStorage.setItem("wishlist", JSON.stringify(editableWishlist));
  };

  const addToCart = () => {
    const result = tempCart.find((cartItem) => cartItem.id == id);
    if (result) {
      result.quantity += quantity;
      const otherItems = tempCart.filter((cartItem) => cartItem.id !== id);
      setTempCart([...otherItems, result]);
      setLocalCart([...otherItems, result]);
      localStorage.setItem("cart", JSON.stringify([...otherItems, result]));
    } else {
      setTempCart([...tempCart, subItem]);
      localStorage.setItem("cart", JSON.stringify([...tempCart, subItem]));
    }
    const editableWishlist = localWishlist.filter((item) => item.id !== id);
    setTempWishlist(editableWishlist);
    setLocalWishlist(editableWishlist);
    localStorage.setItem("wishlist", JSON.stringify(editableWishlist));
  };

  return (
    <>
      <div className="miniTileDiv">
        <div className="miniTop">
          <p className="miniTitle">{title}</p>
        </div>
        <div className="miniBottom">
          <div className="miniBottomLeft">
            <img src={image} alt={title} className="miniImgae" />
          </div>
          <div className="miniBottomRight">
            <div className="miniPriceDiv">
              <p className="miniPrice">${price}</p>
              <button
                className="removeFromWishlistButton"
                onClick={() => remove()}
              >
                Remove
              </button>
            </div>
            <div className="miniQuantityupdate">
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
            </div>
          </div>
        </div>
        <div className="addToCart" onClick={() => addToCart()}>
          Add to Cart
        </div>
      </div>
    </>
  );
}

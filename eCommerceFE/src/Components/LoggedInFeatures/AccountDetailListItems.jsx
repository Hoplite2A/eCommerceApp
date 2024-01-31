//! Imported Libraries --------------------------
import { useState, useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function AccountDetailListItems(item, itemId) {
  const {
    cart,
    setCart,
    tempCart,
    setTempCart,
    localCart,
    setLocalCart,
    tempWishlist,
    setTempWishlist,
    setLocalWishlist
  } = useContext(CartWishlistContext);

  const subItem = item.item;
  const { title, image, price, quantity, product_id } = subItem;
  console.log(subItem);


  //*If we wanted to display that items total cost.
  // const [itemPrice, setItemPrice] = useState(0);
  // useEffect(() => {
  //     let itemPricePH = price * quantity;
  //     const roundedPrice = Math.round(itemPricePH * 10 ** 2) / 10 ** 2;
  //     setItemPrice(roundedPrice);
  // },[item])

  const [newQuantity, setNewQuantity] = useState(quantity);
  const updateQuantity = () => {
    console.log("CLICKED");
    console.log({ product_id });
    console.log({ itemId });
    const itemIndex = cart.findIndex((item) => item.product_id === itemId);
    if (itemId !== -1) {
      const updateCart = [...cart];
      updateCart[itemIndex].quantity = newQuantity;
      setCart(updateCart);
    } else {
      console.log("Error in updateCart");
    }
    // const requiredItem = tempCart.find((item) => item.id == id);
    // requiredItem.quantity = newQuantity * 1;
    // const requiredCartItems = tempCart.filter((item) => item.id !== id);
    // setTempCart([...requiredCartItems, requiredItem]);
    // setLocalCart([...requiredCartItems, requiredItem]);
    // localStorage.setItem(
    //   "cart",
    //   JSON.stringify([...requiredCartItems, requiredItem])
    // );
  };

  const remove = () => {
    const editableCart = cart.filter((item) => item.product_id !== itemId);
    setCart(editableCart);
    // const editableCart = localCart.filter((item) => item.id !== id);
    // setTempCart(editableCart);
    // setLocalCart(editableCart);
    // localStorage.setItem('cart', JSON.stringify(editableCart));
  };

    const addToWishlist = () => {
        const newWishlistItem = tempWishlist.find(cartItem => cartItem.id == id);
            if (newWishlistItem) {
                newWishlistItem.quantity += quantity;
                const otherItems = tempWishlist.filter(cartItem => cartItem.id !== id);
                setTempWishlist([...otherItems, newWishlistItem]);
                setLocalWishlist([...otherItems, newWishlistItem]);
                localStorage.setItem('wishlist', JSON.stringify([...otherItems, newWishlistItem]));
            } else {
                setTempWishlist([...tempWishlist, subItem]);
                localStorage.setItem('wishlist', JSON.stringify([...tempWishlist, subItem]));
            }
            const editableCart = localCart.filter((item) => item.id !== id);
            setTempCart(editableCart);
            setLocalCart(editableCart);
            localStorage.setItem('cart', JSON.stringify(editableCart));
        }

  return (
    <>
      {localCart ? (
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
              </div>
              <div className="miniQuantityupdate">
                <button
                  className="removeFromWishlistButton"
                  onClick={() => remove()}
                >
                  Remove
                </button>
                <button
                  className="updateWishlistQuantity"
                  onClick={() => updateQuantity()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="addToWishlistButton" onClick={() => addToWishlist()}>
            Add to Wishlist
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

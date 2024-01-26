//! Imported Libraries --------------------------
import { useState, useEffect, useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function AccountDetailWishlistItems(item) {

    const { tempWishlist, setTempWishlist, localWishlist, setLocalWishlist } = useContext(CartWishlistContext);
    
    const subItem = item.item;
    const { title, image, price, quantity, id } = subItem;

    const [itemPrice, setItemPrice] = useState(0); 
    useEffect(() => {
        let itemPricePH = price * quantity;
        const roundedPrice = Math.round(itemPricePH * 10 ** 2) / 10 ** 2;
        setItemPrice(roundedPrice);
    },[item])
    
    const [newQuantity, setNewQuantity] = useState(0);
    const updateQuantity = () => {
        const requiredItem = tempWishlist.find((item) => item.id == id);
        requiredItem.quantity = newQuantity * 1;
        const requiredCartItems = tempWishlist.filter((item) => item.id !== id);
        setTempWishlist([...requiredCartItems, requiredItem]);
        setLocalWishlist([...requiredCartItems, requiredItem]);
        localStorage.setItem('wishlist', JSON.stringify([...requiredCartItems, requiredItem]));
   }

    const remove = () => {
        const editableCart = localWishlist.filter((item) => item.id !== id);
        setTempWishlist(editableCart);
        setLocalWishlist(editableCart);
        localStorage.setItem('wishlist', JSON.stringify(editableCart));
    }

    return (<>
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
                        <p className="miniPrice">${itemPrice}</p>
                        <button className="removeFromWishlistButton" onClick={() => remove()}>Remove</button>
                    </div>
                    <div className="miniQuantityupdate">
                        <label className="cartListItemQuantity">Qty:
                            <input className="cartListItemQuantity"
                                id="quantity" type="number"
                                placeholder={quantity}
                                min={1} max={1000000}
                                onChange={(e) => setNewQuantity(e.target.value)} 
                            />
                            </label>
                        <button className="updateWishlistQuantity" onClick={() => updateQuantity()}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
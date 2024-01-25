//! Imported Libraries --------------------------
import { useState, useEffect } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------

//! ---------------------------------------------

export default function AccountDetailListItems(item) {
    const subItem = item.item;
    const { title, image, price, quantity } = subItem;
    
    const [itemPrice, setItemPrice] = useState(0); 
    useEffect(() => {
        let itemPricePH = price * quantity;
        const roundedPrice = Math.round(itemPricePH * 10 ** 2) / 10 ** 2;
        setItemPrice(roundedPrice);
    },[item])
  
    console.log(subItem);

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
                        <p className="miniPrice">{itemPrice}</p>
                        <button className="removeFromWishlistButton">Remove</button>
                    </div>
                    <div className="miniQuantityupdate">
                        <p className="wishlistQuantity">{quantity}</p>
                        <button className="updateWishlistQuantity">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
//! Imported Libraries --------------------------
import { useState, useEffect, useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function AccountDetailListItems(item) {

    const { tempCart, setTempCart, localCart, setLocalCart } = useContext(CartWishlistContext);
    
    const subItem = item.item;
    const { title, image, price, quantity, id } = subItem;
    console.log(subItem);

    const [itemPrice, setItemPrice] = useState(0); 
    useEffect(() => {
        let itemPricePH = price * quantity;
        const roundedPrice = Math.round(itemPricePH * 10 ** 2) / 10 ** 2;
        setItemPrice(roundedPrice);
    },[item])
  
    // const [testingQuant, setTestingQuant] = useState(0)
    // const handleChange = (e) => {
    //     subItem.quantity = e.target.value * 1;
    //     setTestingQuant(subItem.quantity);
    // }
    // console.log(`subItem.quantity = ${testingQuant}`);
    
    // const updateQuantity = (subItem) => {
    //     const otherItems = tempCart.filter(cartItem => cartItem.id !== subItem.id);
    //     setTempCart([...otherItems, subItem]);
    //     setLocalCart([...otherItems, subItem]);
    //     localStorage.setItem('cart', JSON.stringify([...otherItems, subItem]));
    // }

    const [testItem, setTestItem] = useState([]);
 
    const remove = () => {
        const editableCart = localCart.filter((item) => item.id !== id);
        setTestItem(editableCart);
        setTempCart(editableCart);
        setLocalCart(editableCart);
        localStorage.setItem('cart', JSON.stringify(editableCart));
    }

    console.log(testItem);

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
                        <button className="removeFromWishlistButton" onClick={() => remove()}>Remove</button>
                    </div>
                    <div className="miniQuantityupdate">
                        <label className="cartListItemQuantity">Qty:
                            <input className="cartListItemQuantity"
                                id="quantity" type="number"
                                placeholder={quantity}
                                min={1} max={1000000}
                                // onChange={handleChange} 
                            />
                            {/* //TODO -----------------------------Add Event Listener for input/change to quantity and then update CartListItem.quantity &&
                            //TODO ---------------------------------then update TempCart */}
                            </label>
                        <button className="updateWishlistQuantity" >Update</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
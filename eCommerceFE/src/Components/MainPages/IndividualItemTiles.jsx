//! Imported Libraries -------------------------
import { useSignal } from "@preact/signals-react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../UniversalFeatures/Login";

//! --------------------------------------------


export default function IndividualItem({key, item}) {
    
    //*Destructured props from AllItems Fetch:
    const {title, price, description, category, image} = item;

    //*Defining Cart Count for cart feature option:
    const [cartCount, setCartCount] = useSignal(0);

    //*Defining Cart List for cart feature option:
    const [cartList, setCartList] = useSignal([]);
    
    //!Logged-In WishList && Cart    
    //*Variable Function to add item to Wishlist:
    const addToWishlist = (key, item) => {
        
    }
    //*Variable Function to add item to Cart:
    const addToCart = (key, item) => {
        setCartCount(cartCount + 1);
        //Insert into localStorage Array
        //Upon leaving site, send array to database for cross application and session access && retrieval.

    }

    //!Visitor
    //*Variable Function to add item to Cart:
    const addToGuestCart = (key, item) => {
        setCartCount(cartCount + 1);
        //Insert into Temp (localstorage) Array
        //Upon leaving site, cart will be erased
    }
    
    return (<>
        <div className="individualItemTile">
            <div className="individualItemTileTop">
                <div className="individualItemImage">
                    <img src={image} alt={title} />
                </div>
                <div className="individualItemButtons">
                    <p className="individualItemPrice price">{price}</p>
                    {token ? <>
                        <button className="wishlistButton individualItemButton" onClick={addToWishlist}>Add to Wishlist</button>
                        <button className="cartButton individualItemButton" onClick={addToCart}>Add to Cart</button>
                    </> : <>
                        <button className="cartButton individualItemButton" onClick={addToGuestCart}>Add to Cart</button>
                    </>}
                </div>
            </div>
            <div className="individualItemBottom">
                <h3 className="individualTitle">{title}</h3>
                <p className="individualItemDescription description">{description}</p>
            </div>
        </div>
    </>)
}
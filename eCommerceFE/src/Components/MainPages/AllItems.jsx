//! Imported Libraries -------------------------
import { useState, useEffect } from "react";
import { signal } from "@preact/signals-react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { BASE_URL } from "../../App";
import IndividualItem from "./IndividualItemTiles";
import CartItemsList from "../UniversalFeatures/Cart/CartItemsList";
import { dbCart } from "../../App";
//! --------------------------------------------

export default function AllItems() {
//Possible prop drilling reqiured: {tempCart, setTempCart, cartItemId, setCartItemId, tempCountCart, setTempCountCart}
//! ------------------------------------Adding to Wishlist------------------------------------  

//*To Render the products on the AllItem Page
const [allItems, setAllItems] = useState([]);
//*Temporary Wishlist for Duplication Elimination and insertion of quantity key:value pair
const [tempWishlist, setTempWishlist] = useState([]);

//! ------------------------------------Adding to Wishlist------------------------------------
  
//! --------------------------------------Adding to Cart--------------------------------------
const [tempCart, setTempCart] = useState([]);
const [cartItemId, setCartItemId] = useState(null);
const [tempCountCart, setTempCountCart] = useState(0);

  useEffect(() => {
    for (let i = 0; i < tempCart.length; i++){
      if (tempCart[i].id === cartItemId) {
        tempCart[i].quantity = tempCountCart;
      }
    }
    const uniqueCartArr = tempCart.filter((value, id, array) => array.indexOf(value) == id);
    dbCart.value = uniqueCartArr;
    
    localStorage.setItem('cart', JSON.stringify(dbCart));
  }, [tempCart])
//! --------------------------------------Adding to Cart--------------------------------------  

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const res = await fetch(`${BASE_URL}/products/`);
        const json = await res.json();
        const allItemsPH = await json.allProducts;
        setAllItems(allItemsPH);
      } catch (err) {
        console.log(
          `Error occured in fetchAllItems within the AllItems component, ${err}`
        );
        return (
          <>
            <div className="allItemsErrorMessage">
              <p className="errorMessage">
                Our servers are on strike. We will work with them to get back to
                serving you.
              </p>
            </div>
          </>
        );
      }
    }
    return () => fetchAllItems();
  }, []);
  
  return (
    <>
      <div className="AllItemsParentDiv">
        <div className="allItemsDiv">
          {allItems.map((item) => {
            return (
              <IndividualItem
                key={item.id}
                item={item}
                tempCart={tempCart}
                setTempCart={setTempCart}
                tempCountCart={tempCountCart}
                setTempCountCart={setTempCountCart}
                setCartItemId={setCartItemId}
                tempWishlist={tempWishlist}
                setTempWishlist={setTempWishlist}
              />
            );
          })}
        </div>
        <div className={dbCart.value ? "nothingToDisplay" : "cartListDisplay"}>
        {tempCart.map((cartListItem, index) => {
          return <CartItemsList
            key={index} cartListItem={cartListItem}
            setTempCart={setTempCart} tempCountCart={tempCountCart} />
        })}
        </div>
      </div>
    </>
  );
}

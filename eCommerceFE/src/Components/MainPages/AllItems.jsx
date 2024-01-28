//! Imported Libraries -------------------------
import { useState, useEffect, useContext } from "react";
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
import { signal } from "@preact/signals-react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { BASE_URL } from "../../App";
import IndividualItem from "./IndividualItemTiles";
// import CartItemsList from "../UniversalFeatures/Cart/CartItemsList";
//! --------------------------------------------

export default function AllItems() {
  const {
    allItems,
    setAllItems,
    allItemsAdmin,
    tempCart,
    setTempCart,
    cartItemId,
    tempCountCart,
    localCart,
    setLocalCart,
  } = useContext(CartWishlistContext);
  //! ------------------------------------Adding to Wishlist------------------------------------

  //*To Render the products on the AllItem Page
  // const [allItems, setAllItems] = useState([]);
  //*Temporary Wishlist for Duplication Elimination and insertion of quantity key:value pair
  // const [tempWishlist, setTempWishlist] = useState([]);

  //! ------------------------------------Adding to Wishlist------------------------------------

  //! --------------------------------------Adding to Cart--------------------------------------
  // const [tempCart, setTempCart] = useState([]);
  // const [cartItemId, setCartItemId] = useState(null);
  // const [tempCountCart, setTempCountCart] = useState(0);

  useEffect(() => {
    for (let i = 0; i < tempCart.length; i++) {
      if (tempCart[i].id === cartItemId) {
        tempCart[i].quantity = tempCountCart;
      }
    }

    const uniqueCartArr = tempCart.filter(
      (value, id, array) => array.indexOf(value) == id
    );
    setLocalCart(uniqueCartArr);

    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [tempCart]);
  //! --------------------------------------Adding to Cart--------------------------------------

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const res = await fetch(`${BASE_URL}/products/`);
        const json = await res.json();
        if (json.allProducts && Array.isArray(json.allProducts)) {
          const sortedProducts = json.allProducts.sort((a, b) => a.id - b.id);

          setAllItems(sortedProducts);
        } else {
          console.log("Invalid response format. Expected 'allProducts' array.");
        }
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
  }, [allItemsAdmin]);

  return (
    <>
      <div className="AllItemsParentDiv">
        <div className="allItemsDiv">
          {allItems &&
            allItems.map((item) => {
              if (item.available) {
                return <IndividualItem key={item.id} item={item} />;
              }
            })}
        </div>

        {/* <div className={localCart ? "nothingToDisplay" : "cartListDisplay"}>
        {tempCart.map((cartListItem, index) => {
          return <CartItemsList key={index} cartListItem={cartListItem} />
        })}
        </div> */}
      </div>
    </>
  );
}

//! Imported Libraries -------------------------
import { useState, useEffect, useContext } from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { BASE_URL } from "../../App";
import IndividualItem from "./IndividualItemTiles";
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
// import CartItemsList from "../UniversalFeatures/Cart/CartItemsList";
//! --------------------------------------------

export default function AllItems() {

  const { allItems, setAllItems, allItemsAdmin } = useContext(CartWishlistContext);

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
  }, [allItemsAdmin]);

  return (
    <>
      <div className="AllItemsParentDiv">
        <div className="allItemsDiv">
          {allItems.map((item) => {
            return (
              <IndividualItem key={item.id} item={item} />
            );
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
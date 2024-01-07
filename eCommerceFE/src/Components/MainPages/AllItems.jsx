//! Imported Libraries -------------------------
import { useState, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { BASE_URL } from "../../App";
import IndividualItem from "./IndividualItemTiles";
//! --------------------------------------------

// export const [wishlist, setWishlist] = useSignal([]);

// export const [cart, setCart] = useSignal([]);


export default function AllItems() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const res = await fetch(`${BASE_URL}/products/`);
        const json = await res.json();
        console.log(json);
        const allItemsPH = await json.allProducts;
        console.log(allItemsPH);
        setAllItems(allItemsPH);
      } catch (err) {
        console.log(
          `Error occured in fetchAllItems within the AllItems component, ${err}`
        );
        return (<>
          <div className="allItemsErrorMessage">
            <p className="errorMessage">
              Our servers are on strike. We will work with them to get back to
              serving you.
            </p>
          </div>
        </>);
      }
    }
    return () => fetchAllItems();
  }, []);

  return (
    <>
      <div className="allItemsDiv">
        {allItems.map((item) => {
          return <IndividualItem key={item.id} item={item} />;
        })}
      </div>
    </>
  );
}

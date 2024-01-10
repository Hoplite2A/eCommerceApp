//! Imported Libraries -------------------------
import { useState, useEffect } from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { BASE_URL } from "../../App";
import IndividualItem from "./IndividualItemTiles";
// import { car, setCart, wishlist, setWishlist } from './IndividualItemTiles';
//! --------------------------------------------

export default function AllItems() {
  const [allItems, setAllItems] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const [tempWishlist, setTempWishlist] = useState();

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
          return <IndividualItem key={item.id}
            item={item}
            tempCart={tempCart}
            setTempCart={setTempCart}
            tempWishlist={tempWishlist}
            setTempWishlist={setTempWishlist} />;
        })}
      </div>
    </>
  );
}

//! Imported Libraries -------------------------
import { useEffect, useState, useContext } from "react";
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
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
    searchFilteredArray,
    allItemsAdmin,
    changeFilter,
    // tempCart,
    // cartItemId,
    // tempCountCart,
    // localCart,
    // setLocalCart,
  } = useContext(CartWishlistContext);

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

  const [testMappedArray, setTestMappedArray] = useState([]);
  useEffect(() => {
    const filteringAvail = allItems.sort((a,b) => {
      a.available > b.available ? 1 : -1;
  })
    setTestMappedArray(filteringAvail);
  }, [allItems, changeFilter]);

  useEffect(() => {
    const filteringAvail = searchFilteredArray.sort((a,b) => {
      a.available > b.available ? 1 : -1;
  })
    setTestMappedArray(filteringAvail);
  }, [searchFilteredArray, changeFilter]);

  // console.log(allItems);
  // console.log(searchFilteredArray);
  // console.log(testMappedArray);

  return (
    <>
      <div className="AllItemsParentDiv">
        <div className="allItemsDiv">
          {testMappedArray.map((item) => {
            return <IndividualItem key={item.id} item={item} />;
            })
            }
        </div>
      </div>
    </>
  );
}

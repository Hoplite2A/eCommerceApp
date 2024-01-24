//! Imported Libraries --------------------------
import { useState, useEffect } from "react";
import { Signal } from "@preact/signals-react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { BASE_URL } from "../../../App";
import { token } from "../../UniversalFeatures/Login";
import ViewAllProductsRow from "./ViewAllProductsRow";
import { allItems, initializeAllItems } from "../../MainPages/AllItemsSignal";
//! ---------------------------------------------

export default function ViewAllProductsAdmin() {
  const [allProducts, setAllProducts] = useState(allItems.value.allProducts);
  console.log({ allItems });
  async function initialize() {
    try {
      await initializeAllItems();
    } catch (error) {
      console.log(`Error during initialization for AllItems: ${error}`);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const unsubscribe = allItems.subscribe((value) => {
      setAllProducts(value.allProducts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="8">All AllProducts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product ID</td>
            <td>Title</td>
            <td>Price</td>
            <td>Description</td>
            <td>Category</td>
            <td>Image</td>
            <td>Seller Id</td>
            <td>Available</td>
            <td>Edit</td>
            <td>Submit</td>
            <td>Delete</td>
          </tr>
          {allItems.value.allProducts ? (
            allItems.value.allProducts.map((productObject) => {
              return (
                <ViewAllProductsRow
                  key={productObject.id}
                  product={productObject}
                />
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
}

//! Imported Libraries --------------------------
import { useState, useEffect, useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------

import ViewAllProductsRow from "./ViewAllProductsRow";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function ViewAllProductsAdmin() {
  const { allItems, setAllItems, allItemsAdmin, setAllItemsAdmin } =
    useContext(CartWishlistContext);
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th colSpan="11">All Products</th>
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
          {allItems ? (
            allItems.map((productObject) => {
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

//! Imported Libraries --------------------------
import { useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------

import ViewAllProductsRow from "./ViewAllProductsRow";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function ViewAllProductsAdmin() {
  const { allItems } = useContext(CartWishlistContext);
  return (
    <>
      <table className="styled-table">
        <thead className="table-head">
          <tr>
            <th colSpan="11">All Products</th>
          </tr>
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
        </thead>
        <tbody>
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

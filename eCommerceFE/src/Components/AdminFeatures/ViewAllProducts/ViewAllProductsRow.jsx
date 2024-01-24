//! Imported Libraries --------------------------
import { useState, useContext } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { BASE_URL } from "../../../App";
import { token } from "../../UniversalFeatures/Login";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function ViewllProductsRow({ product }) {
  const { id, sellerid } = product;
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const [available, setAvailable] = useState(product.available);
  const { allItems, allItemsAdmin, setAllItemAdmin } =
    useContext(CartWishlistContext);

  const [editable, setEditable] = useState(false);

  async function submitChange(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          title: title,
          price: price,
          description: description,
          category: category,
          image: image,
          available: available,
        }),
      });
      const json = await res.json();
      setEditable(false);
      setAllItemAdmin(!allItemsAdmin);
    } catch (error) {
      console.log(
        `An error occurred with the handleAdminChange function on the ViewProductsRow. Error: ${error}`
      );
    }
  }

  async function deleteProduct() {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });
      const json = await res.json();
      alert(
        `${json.title} has been successfully deleted from the catalog. Nobody will ever be able to access it again.`
      );
      setEditable(false);
      setAllItemAdmin(!allItemsAdmin);
    } catch (error) {
      console.log(
        `An error occurred inside of deleteProduct om ViewAllProductRow: ${error}`
      );
    }
  }

  return (
    <>
      {editable ? (
        <tr>
          <td>{id}</td>
          <td>
            <input
              id="titleAdminEdit"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </td>
          <td>
            <input
              id="priceAdminEdit"
              name="price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </td>
          <td>
            <input
              id="descriptionAdminEdit"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </td>
          <td>
            <input
              id="categoryAdminEdit"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </td>
          <td>
            <img src={image} alt={title} />
            <input
              id="imageAdminEdit"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </td>
          <td>{sellerid}</td>
          <td>
            <select value={available} onChange={() => setAvailable(!available)}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </td>
          <td>
            <button onClick={(e) => setEditable(e.target.value)}>Edit</button>
          </td>
          <td>
            <button onClick={(e) => submitChange(e)}>Submit</button>
          </td>
          <td>
            <button className="deleteButton" onClick={(e) => deleteProduct(e)}>
              DELETE
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{id}</td>
          <td>{title}</td>
          <td>{price}</td>
          <td>{description}</td>
          <td>{category}</td>
          <td>
            <img src={image} alt={title} />
          </td>
          <td>{sellerid}</td>
          <td>{available.toString()}</td>
          <td>
            <button onClick={() => setEditable(!editable)}>Edit</button>
          </td>
          <td></td>
          <td></td>
        </tr>
      )}
    </>
  );
}

// if (available !== product.available.toString()){
//   try {const res = await fetch(`${BASE_URL}/products/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token.value}`,
//     },
//     body: JSON.stringify({
//       title: title,
//       price: price,
//       description: description,
//       category: category,
//       image: image,
//       : ,
//     }),
//   });
//   const json = await res.json();
//   console.log(json);
//   const info = await json;
//   console.log(info);
//   setEditable(false);

//   } catch (error) {
//           console.log(
//     `An error occurrsed with the handleAvailableChange function on the ViewAllProductsRow. Error: ${error}`
//   );
//   }
// }

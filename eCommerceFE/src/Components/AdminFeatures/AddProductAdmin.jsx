//! Imported Libraries --------------------------
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { userDetails } from "../UniversalFeatures/Login";
import { BASE_URL } from "../../App";
import { token } from "../../Components/UniversalFeatures/Login";
//! ---------------------------------------------

export default function AddProductAdmin() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [response, setResponse] = useState("");

  async function handleAddProduct(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          title: title,
          price: price,
          description: description,
          image: image,
          category: category,
        }),
      });
      const json = await res.json();
      console.log(typeof json);
      console.log({ json });
      console.log(typeof json.message);
      const info = await json;
      setResponse(info);
      console.log(response.name);
    } catch (error) {
      console.log(
        `An error occurred within the handleAddProduct on the Admin Page. Error: ${error}`
      );
    }
  }

  return (
    <>
      <form>
        <label htmlFor={title}>Title: </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor={price}>Price: </label>
        <input
          id="price"
          name="price"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor={description}>Description: </label>
        <input
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor={image}>Image: </label>
        <input
          id="image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor={category}>Category: </label>
        <input
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </form>
      <button className="addProductButton" onClick={(e) => handleAddProduct(e)}>
        Add Product
      </button>
      {response && (
        <div>
          <h3>{response.name}</h3>
          <p>{response.message}</p>
        </div>
      )}
    </>
  );
}

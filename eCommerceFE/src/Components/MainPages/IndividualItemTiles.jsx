/* eslint-disable no-unused-vars */
//! Imported Libraries -------------------------
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import {CartWishlistContext} from "../../Contexts/CartWishlistContextProvider";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../UniversalFeatures/Login";
//! --------------------------------------------

// eslint-disable-next-line react/prop-types
export default function IndividualItem({ item }) {
  
  const { id, image, title, price } = item;

  const { tempCart, setTempCart, tempWishlist, setTempWishlist} = useContext(CartWishlistContext);

    const navigate = useNavigate();
    const itemDetailsPage = () => {
        navigate(`/IndividualItemPage/${id}`);
    }

//! ------------------------------------Adding to Wishlist------------------------------------
const addToWishlist = (item) => {
  const result = tempWishlist.find((wishlistItem) => wishlistItem.id == item.id);
  if (result) {
    result.quantity += 1;
    const otherItems = tempWishlist.filter((wishlistItem) => wishlistItem.id !== item.id);
    setTempWishlist([...otherItems, result]);
    localStorage.setItem("wishlist", JSON.stringify([...otherItems, result]));
  } else {
    item.quantity = 1;
    setTempWishlist([...tempWishlist, item]);
    localStorage.setItem("wishlist", JSON.stringify([...tempWishlist, item]));
  }
};
//! ------------------------------------Adding to Wishlist------------------------------------
//! --------------------------------------Adding to Cart--------------------------------------
const addToCart = (item) => {
  const result = tempCart.find(cartItem => cartItem.id == item.id);
  if (result) {
    result.quantity += 1;
    const otherItems = tempCart.filter(cartItem => cartItem.id !== item.id);
    setTempCart([...otherItems, result]);
    localStorage.setItem('cart', JSON.stringify([...otherItems, result]));
  } else {
    item.quantity = 1;
    setTempCart([...tempCart, item]);
    localStorage.setItem('cart', JSON.stringify([...tempCart, item]));
  }
  }
//! --------------------------------------Adding to Cart--------------------------------------
  
  return (
    <>
      <div className="individualItemTile">
        <div className="individualItemTileTop">
            <Link to={`/IndividualItemPage/${id}`} >
                <div className="individualItemImage">
                    <img src={image} alt={title} />
                </div>
          </Link>
        </div>
        <div className="individualItemBottom">
          <h3 className="individualTitle" onClick={itemDetailsPage}>{title}</h3>
          <p className="individualItemPrice price">${price}</p>
        </div>
        <div className="individualItemTileButton">
          {token.value ? (
            <>
              <button className="wishlistButton individualItemButton" onClick={() => addToWishlist(item)}>
                Add to Wishlist
              </button>
              <button className="cartButton individualItemButton" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </>
          ) : (
            <>
              <button className="cartButton individualItemButton" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

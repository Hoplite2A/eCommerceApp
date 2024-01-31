/* eslint-disable no-unused-vars */
//! Imported Libraries -------------------------
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { userDetails } from "../UniversalFeatures/Login";
import { token } from "../UniversalFeatures/Login";
//! --------------------------------------------

// eslint-disable-next-line react/prop-types
export default function IndividualItem({ item }) {
  const { id, image, title, price } = item;

  const { cart, setCart, tempWishlist, setTempWishlist } =
    useContext(CartWishlistContext);

  const navigate = useNavigate();
  const itemDetailsPage = () => {
    navigate(`/IndividualItemPage/${id}`);
  };

  //! ------------------------------------Adding to Wishlist------------------------------------
  const addToWishlist = (item) => {
    const result = tempWishlist.find(
      (wishlistItem) => wishlistItem.id == item.id
    );
    if (result) {
      result.quantity += 1;
      const otherItems = tempWishlist.filter(
        (wishlistItem) => wishlistItem.id !== item.id
      );
      setTempWishlist([...otherItems, result]);
      localStorage.setItem("wishlist", JSON.stringify([...otherItems, result]));
    } else {
      item.quantity = 1;
      setTempWishlist([...tempWishlist, item]);
      localStorage.setItem("wishlist", JSON.stringify([...tempWishlist, item]));
    }
  };
  //! --------------------------------------Adding to Cart--------------------------------------

  function addToCart(item) {
    const userId =
      userDetails.value && userDetails.value.id ? userDetails.value.id : -1;
    let newItem = {
      user_id: userId,
      product_id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
      available: item.available,
    };

    setCart((prevCart) => {
      if (prevCart.length === 0) {
        return [newItem];
      } else {
        const updateCart = prevCart.map((cartItem) => {
          if (cartItem.product_id === newItem.product_id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + newItem.quantity,
            };
          } else {
            return cartItem;
          }
        });
        const existingItemIndex = updateCart.findIndex(
          (cartItem) => cartItem.product_id === newItem.product_id
        );
        if (existingItemIndex === -1) {
          return [...updateCart, newItem];
        } else {
          return updateCart;
        }
      }
    });
  }
  // {
  //   cart.length === 0
  //     ? setCart(newItem)
  //     : cart.forEach((cartItem) => {
  //         if (cartItem.product_id === newItem.product_id) {
  //           cartItem.quantity += newItem.quantity;
  //           console.log([cart]);
  //         } else {
  //           setCart([...cart, newItem]);
  //           console.log({ cart });
  //         }
  //       });
  // }

  // {
  //   const result = tempCart.find((cartItem) => cartItem.id == item.id);
  //   if (result) {
  //     result.quantity += 1;
  //     const otherItems = tempCart.filter((cartItem) => cartItem.id !== item.id);
  //     setTempCart([...otherItems, result]);
  //     localStorage.setItem("cart", JSON.stringify([...otherItems, result]));
  //   } else {
  //     item.quantity = 1;
  //     setTempCart([...tempCart, item]);
  //     localStorage.setItem("cart", JSON.stringify([...tempCart, item]));
  //   }
  // };
  //! --------------------------------------Adding to Cart--------------------------------------

//   const addToCart = (item) => {
//     const result = tempCart.find((cartItem) => cartItem.id == item.id);
//     if (result) {
//       result.quantity += 1;
//       const otherItems = tempCart.filter((cartItem) => cartItem.id !== item.id);
//       setTempCart([...otherItems, result]);
//       localStorage.setItem("cart", JSON.stringify([...otherItems, result]));
//     } else {
//       item.quantity = 1;
//       setTempCart([...tempCart, item]);
//       localStorage.setItem("cart", JSON.stringify([...tempCart, item]));
//     }
//   };


  return (
    <>
      <div className="individualItemTile">
        <div className="individualItemTileTop">
          <Link to={`/IndividualItemPage/${id}`}>
            <div className="individualItemImage">
              <img src={image} alt={title} />
            </div>
          </Link>
        </div>
        <div className="individualItemBottom">
          <h3 className="individualTitle" onClick={itemDetailsPage}>
            {title}
          </h3>
          <p className="individualItemPrice price">${price}</p>
        </div>
        <div className="individualItemTileButton">
          {token.value ? (
            <>
              <button
                className="wishlistButton individualItemButton"
                onClick={() => addToWishlist(item)}
              >
                Add to Wishlist
              </button>
              <button
                className="cartButton individualItemButton"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </>
          ) : (
            <>
              <button
                className="cartButton individualItemButton"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

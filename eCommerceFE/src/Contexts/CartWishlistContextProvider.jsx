/* eslint-disable react/prop-types */
//! Imported Libraries -------------------------
import { createContext, useState, useEffect } from "react";
import { token } from "../Components/UniversalFeatures/Login";
// import { redirect } from 'react-router-dom';
//! --------------------------------------------

//! Imported Components/Variables---------------
//! --------------------------------------------

export const CartWishlistContext = createContext();

export default function CartWishlistContextProvider({ children }) {
  const [pastPurchases, setPastPurchases] = useState([]);
  const [updatePastPurchases, setUpdatePastPurchases] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [allItemsAdmin, setAllItemAdmin] = useState(true);
  const [tempCart, setTempCart] = useState([]);
  const [localCart, setLocalCart] = useState([]);
  const [tempWishlist, setTempWishlist] = useState([]);
  const [localWishlist, setLocalWishlist] = useState([]);
  const [visible, setVisible] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [wishlistSubTotal, setWishlistSubTotal] = useState(0);
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [searchFilteredArray, setSearchFilteredArray] = useState([]);
  
  useEffect(() => {
    const launchCart = localStorage.getItem("cart");
    if (launchCart) {
      setTempCart(JSON.parse(launchCart));
      setLocalCart(JSON.parse(launchCart));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, [localCart]);

  useEffect(() => {
    const launchWishlist = localStorage.getItem("wishlist");
    if (launchWishlist) {
      setTempWishlist(JSON.parse(launchWishlist));
      setLocalWishlist(JSON.parse(launchWishlist));
    } else {
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
  }, []);

  return (
    <CartWishlistContext.Provider
      value={{
        pastPurchases,
        setPastPurchases,
        allItems,
        setAllItems,
        searchFilteredArray,
        setSearchFilteredArray,
        allItemsAdmin,
        setAllItemAdmin,
        tempCart,
        setTempCart,
        localCart,
        setLocalCart,
        tempWishlist,
        setTempWishlist,
        localWishlist,
        setLocalWishlist,
        visible,
        setVisible,
        subTotal,
        setSubTotal,
        wishlistSubTotal,
        setWishlistSubTotal,
        checkoutCart,
        setCheckoutCart,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

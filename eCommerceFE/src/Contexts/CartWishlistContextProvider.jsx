/* eslint-disable react/prop-types */
//! Imported Libraries -------------------------
import { createContext, useState, useEffect } from "react";
// import { redirect } from 'react-router-dom';
//! --------------------------------------------

//! Imported Components/Variables---------------
import { fetchUserCart } from "../Components/UniversalFeatures/Cart/Cart";
import { userDetails } from "../Components/UniversalFeatures/Login";
import { token } from "../Components/UniversalFeatures/Login";

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
  const [changeFilter, setChangeFilter] = useState(true);
  const [searchTextFilteredArray, setSearchTextFilteredArray] = useState([]);

  const [cart, setCart] = useState([]);
  // const [dbCartLoaded, setDbCartLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function updateCart() {
      if (loggedIn && token.value) {
        const dbCart = await fetchUserCart();
        setCart((prevCart) => {
          if (prevCart.length === 0) {
            return dbCart;
          } else {
            const updateCart = [...prevCart];
            dbCart.forEach((dbItem) => {
              const existingItemIndex = updateCart.findIndex(
                (prevItem) => prevItem.product_id === dbItem.product_id
              );
              if (existingItemIndex !== -1) {
                updateCart[existingItemIndex].quantity += dbItem.quantity;
              } else {
                updateCart.push(dbItem);
              }
            });
            return updateCart;
          }
        });
        //     const updateCart = prevCart.map((prevItem) =>  {
        //       const exisitingItem = dbCart.find(dbItem => prevItem.product_id === dbItem.product_id)
        //       if (exisitingItem) {
        //         prevItem.quantity += exisitingItem.quantity;
        //         return dbItem;
        //       } else {
        //         return dbItem;
        //       }
        //     });
        //     }
        //   return updateCart});
        //   }
        // };
      }
    }
    updateCart();
    // const launchCart = localStorage.getItem("cart");
    // if (launchCart) {
    //   setTempCart(JSON.parse(launchCart));
    //   setLocalCart(JSON.parse(launchCart));
    // } else {
    //   localStorage.setItem("cart", JSON.stringify([]));
    // }
  }, [loggedIn]);

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
        updatePastPurchases,
        setUpdatePastPurchases,
        allItems,
        setAllItems,
        searchFilteredArray,
        setSearchFilteredArray,
        changeFilter,
        setChangeFilter,
        searchTextFilteredArray,
        setSearchTextFilteredArray,
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
        cart,
        setCart,
        // dbCartLoaded,
        // setDbCartLoaded,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

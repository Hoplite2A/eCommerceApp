/* eslint-disable react-hooks/exhaustive-deps */
//! Imported Libraries -------------------------
import { Link, useNavigate } from "react-router-dom";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
import { useEffect, useState, useContext } from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../Login";
import { userDetails } from "../Login";
import { postCart } from "../Cart/Cart";
import { BASE_URL } from "../../../App";
//! --------------------------------------------

export default function Navigation() {
  const {
    cart,
    setCart,
    tempCart,
    setTempCart,
    setLocalCart,
    setTempWishlist,
    setLocalWishlist,
    setDbCartLoaded,
    setLoggedIn,
  } = useContext(CartWishlistContext);
  const [adminPrivileges, setAdminPrivileges] = useState(false);
  const navigate = useNavigate();
  // const [logout, setLogout] = useState(false);

  useEffect(() => {
    const details = userDetails.value;
    if (details && details.admin === true) {
      setAdminPrivileges(true);
    }
  }, [userDetails.value]);

  async function handleLogout() {
    token.value = null;
    userDetails.value = null;
    navigate("/");
    const res = await postCart(cart);

    setCart([]);
    setLoggedIn(false);
    setTempWishlist([]);
    setLocalWishlist([]);
    localStorage.clear();
    // return () => sendCartToDB();
  }

  // setLogout(!logout);
  // const cartToDB = JSON.parse(localStorage.getItem("cart"));

  // async function sendCartToDB() {
  //   try {
  //     const res = await fetch(`${BASE_URL}/cart`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ cartToDB }),
  //     });
  //     const json = res.json();
  //     console.log(`Logout Send to DB Cart, ${json}`);
  //   } catch (err) {
  //     console.log(
  //       `Error occurred within sendCartToDB API in Navigation Comp, ${err}`
  //     );
  //   }
  // }

  // setTempCart([]);
  // setLocalCart([]);

  // useEffect(() => {
  //   const cartToDB = JSON.parse(localStorage.getItem('cart'));
  //   async function sendCartToDB() {
  //     try {
  //       const res = await fetch(`${BASE_URL}/cart`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ cartToDB }),
  //       });
  //       const json = res.json();
  //       console.log(`Logout Send to DB Cart, ${json}`);
  //     } catch (err) {
  //       console.log(`Error occurred within sendCartToDB API in Navigation Comp, ${err}`);
  //     }
  //   }
  //   setTempCart([]);
  //   setLocalCart([]);
  //   setTempWishlist([]);
  //   setLocalWishlist([]);
  //   localStorage.clear();
  //   return () => sendCartToDB();
  // }, [logout]);

  return (
    <div className="navBarMaster">
      <div className="navBar">
        <Link to="/">
          <p className="navBarLabels">Home</p>
        </Link>
        {token.value !== null && token.value !== undefined ? (
          <>
            {/* <Link to="/addItem">
              <p className="navBarLabels">Sell Items</p>
            </Link> */}
            <Link to="/accountDetails">
              <p className="navBarLabels">Account Details</p>
            </Link>
            {cart.length > 0 && (
              <Link to="/Cart">
                <p className="navBarLabels">Cart</p>
              </Link>
            )}
            <p className="logoutButton navBarLabels" onClick={handleLogout}>
              Logout
            </p>
            {adminPrivileges && (
              <Link to="/AdminFeatures">
                <p className="navBarLabels">Admin</p>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
              <p className="navBarLabels">Login</p>
            </Link>
            {cart.length === 0 ? (
              <></>
            ) : (
              <Link to="/Cart">
                <p className="navBarLabels">Cart</p>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

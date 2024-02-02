//! Imported Libraries --------------------------
import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import CartItemsList from "./CartItemsList";
import CartSubTotal from "./CartSubTotal";
import Header from "../Navigation/Header";
import Footer from "../Footer";
import { token } from "../../UniversalFeatures/Login";
import { BASE_URL } from "../../../App";
import { userDetails } from "../Login";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
import { initializePastPurchases } from "../../LoggedInFeatures/PastPurchases/PastPurchasesSignal";
//! ---------------------------------------------

export async function postCart(cart) {
  deleteCart();
  for (const item of cart) {
    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          productId: item.product_id,
          quantity: item.quantity,
        }),
      });
      const json = await res.json();
    } catch (error) {
      console.log(`An error occurred while post cart date. Error:${error}`);
    }
  }
}

export async function deleteCart() {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    const json = await res.json();
  } catch (error) {
    console.log(`An error occurred in deleteCart on cart component: ${error}`);
  }
}

export async function fetchUserCart() {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(`Error occurred in PastPurchasesSignal: ${error}`);
  }
}

export default function Cart() {
  const [successfulPurchase, setSuccessfulPurchase] = useState("");
  const [cartSubTotal, setCartSubTotal] = useState(0);
  // const [dbCartLoaded, setDbCartLoaded] = useState(false);
  const { cart, setCart, dbCartLoaded, setDbCartLoaded, loggedIn } =
    useContext(CartWishlistContext);
  // const {
  //   localCart,
  //   setLocalCart,
  //   checkoutCart,
  //   setCheckoutCart,
  //   setTempCart,
  // } = useContext(CartWishlistContext);
  // const userInfo = userDetails.value;
  // const userId = userInfo.id;

  const navigate = useNavigate();
  // let LSCart = JSON.parse(localStorage.getItem("cart"));

  // useEffect(() => {
  //   console.log("IUN USE EFFECT");
  //   console.log(dbCartLoaded);
  //   if (dbCartLoaded === false && loggedIn === true) {
  //     fixCarts();
  //     setDbCartLoaded(true);
  //   }
  //   fixCarts();
  // }, [loggedIn]);

  useEffect(() => {
    totalCart(cart);
  }, [cart]);

  function totalCart(cart) {
    let total = 0;
    for (const item of Object.values(cart)) {
      total += Number(item.quantity) * Number(item.price);
    }
    setCartSubTotal(total.toFixed(2));
  }

  // async function fixCarts() {
  //   console.log("FIX CARTS");
  //   let dbCart = await fetchUserCart();
  //   console.log({ dbCart });
  //   if (dbCart.name === "JsonWebTokenError") {
  //     console.log("IT WAS FALSE");
  //     dbCart = [];
  //   }
  //   const userId =
  //     userDetails.value && userDetails.value.id ? userDetails.value.id : -1;
  //   const updateCartItems = [...dbCart];
  //   // const currentStorageCart = LSCart;
  //   // let newItem = [];
  //   console.log({ cart });
  //   if (cart.length > 0) {
  //     cart.forEach((item) => {
  //       console.log("IN CART.FOREACH OF FIXCARTS");
  //       console.log({ item });
  //       let newItem = {
  //         user_id: userId,
  //         product_id: item.product_id,
  //         title: item.title,
  //         price: item.price,
  //         quantity: item.quantity,
  //         image: item.image,
  //         available: item.available,
  //       };
  //       updateCartItems.forEach((dbItem) => {
  //         console.log(dbItem.product_id);
  //         if (dbItem.product_id === newItem.product_id) {
  //           dbItem.quantity += newItem.quantity;
  //         } else {
  //           updateCartItems.push(newItem);
  //         }
  //       });
  //     });
  //   }
  //   // const userCart = [...dbCart, ...updateCartItems];
  //   // setCart(userCart);
  //   console.log("END OF FIX CARTS");
  //   console.log({ updateCartItems });
  //   setCart([...updateCartItems]);
  //   console.log({ cart });
  // }

  const checkout = () => {
    async function CheckoutCart() {
      try {
        const res = await fetch(`${BASE_URL}/pastPurchases`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const json = await res.json();
        const checkoutMessage = json;

        if (checkoutMessage.purchase.id) {
          try {
            const res = await fetch(`${BASE_URL}/cart`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
              },
            });
            const json = await res.json();
            setCart([]);
            // setCheckoutCart([]);
            // setLocalCart([]);
            // setTempCart([]);
            // LSCart = [];
            // localStorage.setItem("cart", JSON.stringify([]));
          } catch (err) {
            console.log(
              `Error Occurred in CheckoutCart Function within the Cart Component, ${err}`
            );
          }
          const date = new Date(
            checkoutMessage.purchase.purchase_date
          ).toLocaleDateString(undefined, options);
          initializePastPurchases();
          setSuccessfulPurchase(
            <>
              <h4>
                `Congrats! Your purchase of $
                {checkoutMessage.purchase.purchase_total} was succesfully
                completed on ${date}. If you would like to review this purchase
                please visit your orders page. Order ID $
                {checkoutMessage.purchase.id}`
              </h4>
              <Link to="/pastPurchases">View Your Past Purchases Here!</Link>
            </>
          );

          return checkoutMessage;
        }
      } catch (err) {
        console.log(
          `Error Occurred in CheckoutCart Function within the Cart Component, ${err}`
        );
      }
    }
    CheckoutCart();
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <div className="cartPage">
        <Header />
        <div className="cartPageDiv">
          <div className="cartPageDivLeft">
            {successfulPurchase ? (
              <>{successfulPurchase} </>
            ) : cart.length > 0 ? (
              cart.map((cartListItem, index) => {
                return (
                  <CartItemsList
                    key={index}
                    cartListItem={cartListItem}
                    itemId={cartListItem.product_id}
                  />
                );
              })
            ) : (
              <h4>Nothing in Cart</h4>
            )}
          </div>
          <div className="cartPageDivRight">
            <div className="cartSubTotal">
              {/* <CartSubTotal localCart={cart} /> */}
              {/* <p>Cart Subtotal: {(for const item of checkoutCart)}</p> */}
              <p className="cartSubTotalText">Cart Total: ${cartSubTotal}</p>
            </div>
            {cart && token.value ? (
              <div className="cartbuttons">
                <button className="checkout" onClick={() => checkout()}>
                  Checkout
                </button>
                <button className="checkout" onClick={() => postCart(cart)}>
                  SAVE CART
                </button>
              </div>
            ) : (
              <Link to="/login">Log in or Sign up to checkout your cart!</Link>
            )}
          </div>
        </div>
        <button className="continueShopping" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
        <Footer />
      </div>
    </>
  );
}

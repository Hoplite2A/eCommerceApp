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

export default function Cart() {
  const [successfulPurchase, setSuccessfulPurchase] = useState("");
  const {
    localCart,
    setLocalCart,
    checkoutCart,
    setCheckoutCart,
    setTempCart,
  } = useContext(CartWishlistContext);
  // const userInfo = userDetails.value;
  // const userId = userInfo.id;

  // Why set LSCart if we already have a localCart????
  const navigate = useNavigate();
  let LSCart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    fixCarts();
  }, []);

  async function fetchUserCart() {
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

  async function fixCarts() {
    console.log("IN FIX CARTS");
    let dbCart = await fetchUserCart();
    if (dbCart.name === "JsonWebTokenError") {
      dbCart = [];
    }
    console.log({ dbCart });

    const userId =
      userDetails.value && userDetails.value.id ? userDetails.value.id : -1;
    const updateCartItems = [];
    const currentStorageCart = LSCart;
    console.log({ currentStorageCart });
    let newItem = [];
    currentStorageCart.forEach((item) => {
      let newItem = {
        user_id: userId,
        product_id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        available: item.available,
      };
      dbCart.forEach((dbItem) => {
        console.log("IN FUCKING FOR EACH LOOP OF CART");
        console.log({ dbItem });
        console.log(dbItem.product_id);
        console.log({ item });
        console.log(item.id);
        if (dbItem.product_id === newItem.product_id) {
          newItem.quantity += dbItem.quantity;
        }
      });
      updateCartItems.push(newItem);
    });

    const userCart = [...dbCart, ...updateCartItems];
    console.log({ userCart });
    setCheckoutCart(userCart);
  }

  async function postCart(cart) {
    console.log(cart);
    for (const item of cart) {
      console.log(item);
      console.log(item.id);
      console.log(item.product_id);
      console.log(typeof item.product_id);

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
      } catch (error) {
        console.log(`An error occurred while post cart date. Error:${error}`);
      }
    }
  }

  const checkout = () => {
    async function CheckoutCart() {
      console.log("IN CHECKOUT CART");
      try {
        const res = await fetch(`${BASE_URL}/pastPurchases`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
          body: JSON.stringify({
            cart: checkoutCart,
          }),
        });
        const json = await res.json();
        const checkoutMessage = json;
        if (checkoutMessage.purchase.id) {
          try {
            console.log("DELETING");
            const res = await fetch(`${BASE_URL}/cart`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
              },
            });
            const json = await res.json();
            setCheckoutCart([]);
            setLocalCart([]);
            setTempCart([]);
            LSCart = [];
            localStorage.setItem("cart", JSON.stringify([]));
          } catch (err) {
            console.log(
              `Error Occurred in CheckoutCart Function within the Cart Component, ${err}`
            );
          }
          console.log(checkoutMessage);
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
            ) : checkoutCart.length > 1 ? (
              checkoutCart.map((cartListItem, index) => {
                console.log({ checkoutCart });
                console.log("MAPPING HERE");
                return (
                  <CartItemsList key={index} cartListItem={cartListItem} />
                );
              })
            ) : (
              <h4>Nothing in Cart</h4>
            )}
          </div>
          <div className="cartPageDivRight">
            <div className="cartSubTotal">
              <p>Cart Subtotal: {checkoutCart.id}</p>
              {/* <p className="cartSubTotalText">Cart Total: ${checkoutCart}</p> */}
            </div>
            {checkoutCart ? (
              <div className="cartbuttons">
                <button className="checkout" onClick={() => checkout()}>
                  Checkout
                </button>
                <button
                  className="checkout"
                  onClick={() => postCart(checkoutCart)}
                >
                  SAVE CART
                </button>
              </div>
            ) : (
              <></>
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

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
  const { localCart, setLocalCart, checkoutCart, setCheckoutCart } =
  useContext(CartWishlistContext);
  
  useEffect(() => {
    
  }, [localCart]);

  async function postCart(cart) {
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
      } catch (error) {
        console.log(`An error occurred while post cart date. Error:${error}`);
      }
    }
  }

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
            cart: checkoutCart,
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
            setCheckoutCart([]);
            setLocalCart([]);
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
    return () => CheckoutCart();
  };

  return (
    <>
      <div className="cartPage">
        <Header />
        <div className="cartPageDiv">
          <div className="cartPageDivLeft">
            {/* {successfulPurchase ? (
              <>{successfulPurchase} </>
            ) : checkoutCart.length > 1 ? ( */}
            {localCart ? localCart.map((cartListItem, index) => {
              return (
                <CartItemsList key={index} cartListItem={cartListItem} />
              );
            })  : (
              <h4>Nothing in Cart</h4>
            )}
          </div>
          <div className="cartPageDivRight">
            <div className="cartSubTotal">
              <p>Cart Subtotal: {checkoutCart.id}</p>
              {/* <p className="cartSubTotalText">Cart Total: ${checkoutCart}</p> */}
            </div>
            {localCart ? (
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

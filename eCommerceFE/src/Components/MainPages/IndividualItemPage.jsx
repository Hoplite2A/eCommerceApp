//! Imported Libraries -------------------------
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! --------------------------------------------

//! Imported Components/Variables---------------
import Header from "../UniversalFeatures/Navigation/Header";
import Footer from "../UniversalFeatures/Footer";
import { userDetails } from "../UniversalFeatures/Login";
import { token } from "../UniversalFeatures/Login";
import { BASE_URL } from "../../App";
// import { tempCart, setTempCart, tempWishlist, setTempWishlist } from './AllItems';
//! --------------------------------------------

export default function IndividualItemPage() {
  const { cart, setCart, tempWishlist, setTempWishlist } =
    useContext(CartWishlistContext);

  const navigate = useNavigate();
  const allItemsPage = () => {
    navigate("/");
  };

  const visible = token.value;
  const { id } = useParams();
  const [item, setItem] = useState({});
  const { image, title, description, price } = item;

  useEffect(() => {
    async function IndividualItemPageFetch() {
      try {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        const json = await res.json();
        setItem(json.singleProduct);
      } catch (err) {
        console.log(
          `Error occurred in the IndividualItemPageFetch within the IndividualItemPage component, ${err}`
        );
        return (
          <>
            <div className="allItemsErrorMessage">
              <p className="errorMessage">
                Aparently our servers needed a coffee break. Once they are
                re-cafinated, they will provide you the info you requested.
              </p>
            </div>
          </>
        );
      }
    }
    return () => IndividualItemPageFetch();
  }, [id]);
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
  //! ------------------------------------Adding to Wishlist------------------------------------
  //! --------------------------------------Adding to Cart--------------------------------------
  function addToCart(item) {
    console.log("ADDING TO CART");
    const userId =
      userDetails.value && userDetails.value.id ? userDetails.value.id : -1;
    let newItem = {
      user_id: userId,
      product_id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      available: item.available,
    };
    cart.forEach((cartItem) => {
      if (cartItem.product_id === newItem.product_id) {
        cartItem.quantity += newItem.quantity;
        console.log(cart);
      } else {
        setCart(...cart, newItem);
      }
    });
  }

  // const result = tempCart.find((cartItem) => cartItem.id == item.id);
  // if (result) {
  //   result.quantity += 1;
  //   const otherItems = tempCart.filter((cartItem) => cartItem.id !== item.id);
  //   setTempCart([...otherItems, result]);
  //   localStorage.setItem("cart", JSON.stringify([...otherItems, result]));
  // } else {
  //   item.quantity = 1;
  //   setTempCart([...tempCart, item]);
  //   localStorage.setItem("cart", JSON.stringify([...tempCart, item]));
  // }

  //! --------------------------------------Adding to Cart--------------------------------------

  return (
    <>
      <Header />
      <div className="individualItemPage">
        <div className="individualItemPageLeft">
          <div className="individualItemPageImage">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="individualItemPageRight">
          <h3 className="individualItemPageTitle">{title}</h3>
          <p className="individualItemPageDescription">{description}</p>
          <div className="individualItemPageInfo">
            <div className="individualItemPagePriceDiv">
              <p className="individualItemPagePrice price">${price}</p>
            </div>
            <div
              className={
                visible
                  ? "individualItemPageButtonLoggedIn"
                  : "individualItemPageButtonVisiting"
              }
            >
              {/* <div className="individualItemPageButtonVisiting individualItemPageButtonLoggedIn"> */}
              {visible ? (
                <>
                  <button
                    className="wishlistButton individualItemPageButton"
                    onClick={() => addToWishlist(item)}
                  >
                    Add to Wishlist
                  </button>
                  <button
                    className="cartButton individualItemPageButton"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="cartButton individualItemPageButton"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="backMessage">Not digging this, check out other items</p>
      <button className="backToHome" onClick={allItemsPage}>
        OTHER ITEMS
      </button>
      <Footer />
    </>
  );
}

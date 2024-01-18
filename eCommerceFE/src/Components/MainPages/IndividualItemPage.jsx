//! Imported Libraries -------------------------
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//! --------------------------------------------

//! Imported Components/Variables---------------
import Header from "../UniversalFeatures/Navigation/Header";
import Footer from "../UniversalFeatures/Footer";
import { token } from "../UniversalFeatures/Login";
import { BASE_URL } from "../../App";
// import { tempCart, setTempCart, tempWishlist, setTempWishlist } from './AllItems';
//! --------------------------------------------

export default function IndividualItemPage() {
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

//! --------------------------------------Adding to Cart--------------------------------------
const [counter, setCounter] = useState(1);
const addToCart = (item) => {
  
  setCartItemId(id);

  const updatedCartValue = [...tempCart, item ];
  for (let i = 0; i < updatedCartValue.length; i++) {
    if (updatedCartValue[i].id === id) {
      setCounter(updatedCartValue[i].quantity);
      setCounter(counter + 1);
    }
  }
  setTempCountCart(counter);
  setTempCart(updatedCartValue);
}
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
                  <button className="wishlistButton individualItemPageButton" >
                    Add to Wishlist
                  </button>
                  <button className="cartButton individualItemPageButton" onClick={addToCart}>
                    Add to Cart
                  </button>
                </>
              ) : (
                <>
                  <button className="cartButton individualItemPageButton" onClick={addToCart}>
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

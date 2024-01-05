//! Imported Libraries -------------------------
import { Link } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../UniversalFeatures/Login";
//! --------------------------------------------

export default function IndividualItem({ item }) {
  //*Destructured props from AllItems Fetch:
  const { id, title, price, image } = item;

  // //*Defining Cart Count for cart feature option:
  // const [cartCount, setCartCount] = useSignal(0);

  // //*Defining Cart List for cart feature option:
  // const [cartList, setCartList] = useSignal([]);

  //!Logged-In WishList && Cart
  //*Variable Function to add item to Wishlist:
  // const addToWishlist = (item) => {

  // }
  // //*Variable Function to add item to Cart:
  // const addToCart = (item) => {
  //     setCartCount(cartCount + 1);
  //     //Insert into localStorage Array
  //     //Upon leaving site, send array to database for cross application and session access && retrieval.

  // }

  // // //!Visitor
  // //*Variable Function to add item to Cart:
  // const addToGuestCart = (item) => {
  //     setCartCount(cartCount + 1);
  //     // Insert into Temp (localstorage) Array
  //     // Upon leaving site, cart will be erased
  // }

  const visible = token.value;

    //! Test IndividualItemPage Route &&
    //TODO ---- Change/Test all desconstruct item object variables in return statement
    
  return (
    <>
      <div className="individualItemTile">
        <div className="individualItemTileTop">
          <Link to={`/IndividualItemPage/${item.id}`}>
            <div className="individualItemImage">
              <img src={item.image} alt={item.title} />
            </div>
          </Link>
        </div>
        <div className="individualItemBottom">
          <h3 className="individualTitle">{item.title}</h3>
          <p className="individualItemPrice price">{item.price}</p>
        </div>
        <div className="individualItemTileButton">
          {visible ? (
            <>
              <button className="wishlistButton individualItemButton">
                Add to Wishlist
              </button>
              <button className="cartButton individualItemButton">
                Add to Cart
              </button>
            </>
          ) : (
            <>
              <button className="cartButton individualItemButton">
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

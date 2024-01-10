//! Imported Libraries -------------------------
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../UniversalFeatures/Login";
// import { wishlist, setWishlist } from './AllItems';

//! --------------------------------------------

export default function IndividualItem({ item, tempCart, setTempCart}) {

  // useEffect(() => {
  //   const localCart = localStorage.getItem('cart');
  //   if (localCart) {
  //     const storedCart = JSON.parse(localCart) || [];
  //     setTempCart(storedCart);
  //   } else {
  //     localStorage.setItem('cart', JSON.stringify([]));
  //   }
  // }, []);

  const { id, image, title, price } = item;

    const navigate = useNavigate();
    const itemDetailsPage = () => {
        navigate(`/IndividualItemPage/${item.id}`);
    }

  //* --------- ADD TO WISHLIST FUNCTION --------
  const [wishlist, setWishlist] = useState();
  const addToWishlist = (item) => {
    console.log(item);
    const updatedWishlistValue = [...wishlist, item ];
    setWishlist(updatedWishlistValue);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log(wishlist);
  }
  
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);
  //* --------- ADD TO WISHLIST FUNCTION --------

  //! ----------- ADD TO CART FUNCTION ----------
  const addToCart = (item) => {
    console.log(item);
    console.log(tempCart);
    const updatedCartValue = [...tempCart, item ];
    console.log(updatedCartValue);
    setTempCart(updatedCartValue);
    localStorage.setItem('cart', JSON.stringify(updatedCartValue));
  }
  
  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      const storedCart = JSON.parse(localCart);
      setTempCart(storedCart);
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, []);
  //! ----------- ADD TO CART FUNCTION ----------
  
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
          <h3 className="individualTitle" onClick={itemDetailsPage}>{title}</h3>
          <p className="individualItemPrice price">${price}</p>
        </div>
        <div className="individualItemTileButton">
          {token.value ? (
            <>
              <button className="wishlistButton individualItemButton" onClick={() => addToWishlist(item)}>
                Add to Wishlist
              </button>
              <button className="cartButton individualItemButton" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </>
          ) : (
            <>
              <button className="cartButton individualItemButton" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

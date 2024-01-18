/* eslint-disable no-unused-vars */
//! Imported Libraries -------------------------
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../UniversalFeatures/Login";
//! --------------------------------------------

// eslint-disable-next-line react/prop-types
export default function IndividualItem({ item, tempCart, setTempCart, tempCountCart, setTempCountCart, setCartItemId, tempWishlist, setTempWishlist}) {
  
  const { id, image, title, price } = item;

    const navigate = useNavigate();
    const itemDetailsPage = () => {
        navigate(`/IndividualItemPage/${item.id}`);
    }

//! ------------------------------------Adding to Wishlist------------------------------------  
  const addToWishlist = (item) => {
    const updatedWishlistValue = [...tempWishlist, item ];
    setTempWishlist(updatedWishlistValue);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlistValue));
  }

  useEffect(() => {
    const localWishlist = localStorage.getItem('wishlist');
    if (localWishlist) {
      const storedWishlist = JSON.parse(localWishlist);
      setTempWishlist(storedWishlist);
    } else {
      localStorage.setItem('wishlist', JSON.stringify([]));
    }
  }, []);
//! ------------------------------------Adding to Wishlist------------------------------------  

//! --------------------------------------Adding to Cart--------------------------------------
  const [counter, setCounter] = useState(1);
  const addToCart = (item) => {
    
    setCartItemId(item.id);

    const updatedCartValue = [...tempCart, item ];
    for (let i = 0; i < updatedCartValue.length; i++) {
      if (updatedCartValue[i].id === item.id) {
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

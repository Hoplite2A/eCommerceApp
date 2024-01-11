//! Imported Libraries -------------------------
import { Link, useNavigate } from "react-router-dom";
import { useEffect} from "react";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../UniversalFeatures/Login";
//! --------------------------------------------

export default function IndividualItem({ item, tempCart, setTempCart, tempWishlist, setTempWishlist}) {

  const { id, image, title, price } = item;

    const navigate = useNavigate();
    const itemDetailsPage = () => {
        navigate(`/IndividualItemPage/${item.id}`);
    }

  //* --------- ADD TO LOCAL WISHLIST FUNCTION --------
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
  //* --------- ADD TO LOCAL WISHLIST FUNCTION --------

  //* ----------- ADD TO LOCAL CART FUNCTION ----------
  const addToCart = (item) => {
    const updatedCartValue = [...tempCart, item ];
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
  //* ----------- ADD TO LOCAL CART FUNCTION ----------
  
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

//! Imported Libraries --------------------------
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { cartCount, setCartCount } from "../../MainPages/IndividualItemTiles";
import { cartList, setCartList } from "../../MainPages/AllItems";
//! ---------------------------------------------

export default function CartItemsList({key, cartItem}) {

  const { image, title, price, description, quantity} = cartItem;

  //TODO ---- Create subtotal function against the method -------------------
  const [cartSubTotal, setCartSubTotal] = useSignal(0);


  //*Initializing CartQuantity for future calculations.
  setCartCount(quantity);

  const removeItem = () => {
    setCartList(cartList.filter((cartItem) => cartItem.id !== cartItem.id));
    
    //*Setting cart count for cart logo in Header to show RealTime Cart Count value.
    setCartCoumt(cartCount - 1)
  };

  return (
    <>
      <div className="cartListItemTile">
        <div className="cartListItemImage">
          <img src={image} alt="" />
        </div>
        <div className="cartListItemDetails">
          <p className="cartListItemTitle">{title}</p>
          <p className="cartListItemPrice">{price}</p>
          <p className="cartItemListDescription">{description}</p>
        </div>
        <div className="cartListItemButton">
          <button className="removeItem" onClick={removeItem}>Remove</button>
        </div>
      </div>
    </>
  );
}

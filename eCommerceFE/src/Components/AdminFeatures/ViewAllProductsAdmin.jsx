//! Imported Libraries -------------------------
import { useContext } from "react";
//! --------------------------------------------
//! Imported Components/Variables---------------
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! --------------------------------------------


export default function ViewAllProductsAdmin() {

  const { allItemsAdmin, setAllItemAdmin } = useContext(CartWishlistContext);
  
  const handleUpdate = () => {
    setAllItemAdmin(!allItemsAdmin);
  }

  return <>VIEW ALL PRODUCTS</>;
}

//! Imported Libraries -------------------------
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../Login";
import { userDetails } from "../Login";
//! --------------------------------------------

export default function Navigation() {

  const { tempCart, localCart, visible } = useContext(CartWishlistContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    token.value = null;
    userDetails.value = null;
    navigate("/");
  };

  return (
    <div className="navBarMaster">
      <div className="navBar">
        <Link to="/">
          <p className="navBarLabels">Home</p>
        </Link>
        {token.value !== null && token.value !== undefined ? (
          <>
            <Link to="/addItem">
              <p className="navBarLabels">Sell Items</p>
            </Link>
            <Link to="/accountDetails">
              <p className="navBarLabels">Account Details</p>
            </Link>
            {!visible ? <></> :
              <Link to="/Cart">
                <p className="navBarLabels">Cart</p>
              </Link>}
            <p className="logoutButton navBarLabels" onClick={handleLogout}>Logout</p>
          </>
        ) : ( <>
          <Link to="/login">
            <p className="navBarLabels">Login</p>
          </Link>
            {visible ? <></> :
              <Link to="/Cart">
                <p className="navBarLabels">Cart</p>
              </Link>}
        </>)}
      </div>
    </div>
  );
}

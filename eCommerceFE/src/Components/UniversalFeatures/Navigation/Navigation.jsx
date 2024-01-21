//! Imported Libraries -------------------------

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";

//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../Login";
import { userDetails } from "../Login";

import { useEffect, useState } from "react";
//! --------------------------------------------

export default function Navigation() {
  // console.log(userDetails.value.admin);
  const [adminPrivileges, setAdminPrivileges] = useState(false);

  useEffect(() => {
    const details = userDetails.value;
    if (details && details.admin === true) {
      console.log(details.admin);
      setAdminPrivileges(true);
    }
  }, [userDetails.value]);

  const navigate = useNavigate();

  const { tempCart } = useContext(CartWishlistContext);

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

            {tempCart.length === 0 ? (
              <></>
            ) : (
              <Link to="/Cart">
                <p className="navBarLabels">Cart</p>
              </Link>
            )}
            <p className="logoutButton navBarLabels" onClick={handleLogout}>
              Logout
            </p>
            {adminPrivileges && (
              <Link to="/AdminFeatures">
                <p className="navBarLabels">Admin</p>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
              <p className="navBarLabels">Login</p>
            </Link>
            {tempCart.length === 0 ? (
              <></>
            ) : (
              <Link to="/Cart">
                <p className="navBarLabels">Cart</p>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

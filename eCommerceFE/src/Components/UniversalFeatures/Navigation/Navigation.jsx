//! Imported Libraries -------------------------
import { Link, useNavigate } from "react-router-dom";
//! --------------------------------------------
//! Imported Components/Variables---------------
import { token } from "../Login";
import { userDetails } from "../Login";
//! --------------------------------------------

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    token.value = null;
    console.log(token.value);
    userDetails.value = null;
    console.log(userDetails.value);
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
            <p className="logoutButton navBarLabels" onClick={handleLogout}>
              Logout
            </p>
          </>
        ) : (
          <Link to="/login">
            <p className="navBarLabels">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
}

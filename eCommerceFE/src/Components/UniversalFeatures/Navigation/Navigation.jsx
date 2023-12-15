//! Imported Libraries -------------------------
import { token } from "@preact/signals-react";
import { Link } from "react-router-dom";
//! --------------------------------------------

//! Imported Components ------------------------
// None to add as this is a simple navigation component.
//! --------------------------------------------

export default function Navigation() {
  return (
    <div className="navBar">
      <Link to="/">Home</Link>
      <Link to="/AddItem">Sell</Link>
      <Link to="/Contact">Contact Us</Link>
      <Link to="/About">About</Link>
      {token !== null ? (
        <Link to="/AccountDetails">Profile</Link>
      ) : (
        <Link to="/Login">Login</Link>
      )}
    </div>
  );
}

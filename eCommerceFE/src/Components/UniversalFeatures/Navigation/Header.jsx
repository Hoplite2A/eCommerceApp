//! Imported Libraries -------------------------
// import { Link } from 'react-router-dom';
//! --------------------------------------------

//! Imported Components ------------------------
import Logo from "../Logo";
import Navigation from "./Navigation";
//! --------------------------------------------
export default function Header() {
  //TODO ---- Evaluation where we want to redirect endUser when
  //TODO ---- clicking on siteName OR <Logo />
  
  return (
    <div className="Header">
      <div className="logo">
        <Logo />
      </div>
      <div className="siteName">
        <h1 className="siteNameText">JavaJunction</h1>
        <h1 className="siteNameText">QuantumShop</h1>
        <h1 className="siteNameText">BinaryBizaar</h1>
        <h1 className="siteNameText">CartHub</h1>
      </div>
      <div className="navBar">
        <Navigation />
      </div>
    </div>
  );
}

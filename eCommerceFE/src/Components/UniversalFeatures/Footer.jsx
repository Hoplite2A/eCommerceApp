//! Imported Libraries -------------------------
import { useState } from 'react';
import { Link } from "react-router-dom";
import { token } from "../UniversalFeatures/Login";
//! --------------------------------------------

//! Imported Components/Variables---------------
// import HideFeature from "./HideFeature";
//! --------------------------------------------

export default function Footer() {
  
  const [visible, setVisible] = useState(false);
  
  const handleClick = () => {
    setVisible(!visible);
  }

  return (<>
    {visible ? <>
      <div className="footer">
        <div className="collapseFooterButton" onClick={handleClick}>COLLAPSE</div>
        <div className="footerLinkSection">
          <div className="getToKnowUs sectionLinks expanded">
            <h3 className="linksTitle">Get to Know Us</h3>
            <Link to="/about">
              <h4 className="footerLinks pLink">About</h4>
            </Link>
            <Link to="/careers">
              <h4 className="footerLinks pLink">Careers</h4>
            </Link>
            <Link to="/contactUs">
              <h4 className="footerLinks pLink">Contact Us</h4>
            </Link>
            <Link to="/csrStatement">
              <h4 className="footerLinks pLink">CSR Statement</h4>
            </Link>
            <Link to="/greenInitiativeStatement">
              <h4 className="footerLinks pLink">Green Initiative</h4>
            </Link>
          </div>
          <div className="membershipFeatures sectionLinks expanded">
            <h3 className="linksTitle">Membership Features</h3>
            <Link to="/membershipInfo">
              <h4 className="footerLinks pLink">Membership Benefits</h4>
            </Link>
            <Link to="/sellingInfo">
              <h4 className="footerLinks pLink">How to Sell</h4>
            </Link>
          </div>
          <div className="giftCardInfo sectionLinks expanded">
            <h3 className="linksTitle">Gift Cards</h3>
            <Link to="/giftCards">
              <h4 className="footerLinks pLink">Purchase Gift Cards</h4>
            </Link>
            <Link to="/reloadGiftCard">
              <h4 className="footerLinks pLink">Reload Gift Card</h4>
            </Link>
          </div>
          <div className="manageAccount sectionLinks expanded">
            <h3 className="linksTitle">Manage Account</h3>
            {token.value ? <>
            <Link to="/accountDetails">
              <h4 className="footerLinks pLink">Your Account</h4>
            </Link>
              <Link to="/orderHistory">
              <h4 className="footerLinks pLink">Your Orders</h4>
            </Link>
            <Link to="/returns">
              <h4 className="footerLinks pLink">Returns</h4>
            </Link>
              </> : <>
              <Link to="/register">
                <h4 className="footerLinks pLink">Register</h4>
              </Link>
            </>}
            <Link to="/warranty">
              <h4 className="footerLinks pLink">Warranty Policy</h4>
            </Link>
          </div>
        </div>
        <div className="socialMediaLinks">
          <Link>
            <img src="" alt="" />
          </Link>
          <Link>
            <img src="" alt="" />
          </Link>
          <Link>
            <img src="" alt="" />
          </Link>
          <Link>
            <img src="" alt="" />
          </Link>
        </div>
      </div> </> : <>
      <div className="collapsedFooterParent footer">
      <div className="closeButton" onClick={handleClick}>EXPAND</div>
        <div className="collapsedFooter" onClick={handleClick}>
          <div className="collapedLinksTitle ">
            <h3 className="linksTitle ">Get to Know Us</h3>
          </div>
          <div className="collapedLinksTitle ">
            <h3 className="linksTitle ">Membership Features</h3>
          </div>
          <div className="collapedLinksTitle ">
            <h3 className="linksTitle ">Gift Cards</h3>
          </div>
          <div className="collapedLinksTitle ">
            <h3 className="linksTitle ">Manage Account</h3>
          </div>
        </div>
        <div className="collapedSocialMediaLinks">
          <div>
            {/* //TODO ------------------ Create and Add X Account and link to account. */}
            <Link>
              <img src="./" alt="X (Formerly know as twitter) logo." />
            </Link>
          </div>
          <div>
            {/* //TODO ------------------ Create and Add Insta Account and link to account. */}
            <Link>
              <img src="" alt="Instgram Logo" />
            </Link>
          </div>
          <div>
            {/* //TODO ------------------ Create and Add GMail Account and link to account. */}
            <Link>
              <img src="" alt="GMail Logo and send us an email Link." />
            </Link>
          </div>
          <div>
            {/* //TODO ------------------ Create and Add __________ Account and link to account. */}
            <Link>
              <img src="" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>}</>
  )
}
      
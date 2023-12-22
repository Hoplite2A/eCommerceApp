//! Imported Libraries -------------------------
import { Link } from "react-router-dom";
import {useState} from 'react';
//! --------------------------------------------

//! Imported Components/Variables---------------
import HideFeature from "./HideFeature";
//! --------------------------------------------

export default function Footer() {

  const [visible, setVisible] = useState(false);
  
  const handleClick = () => {
    setVisible(!visible);
  }

  return (<>
    {visible ? <>
      <HideFeature visible={visible} setVisible={setVisible} />
      <div className="footer">
        <div className="footerLinkSection">
          <div className="getToKnowUs sectionLinks">
            <h3 className="linksTitle">Get to Know Us</h3>
            <Link to="/about">
              <h4 className="footerLinks">About</h4>
            </Link>
            <Link to="/careers">
              <h4 className="footerLinks">Careers</h4>
            </Link>
            <Link to="/contactUs">
              <h4 className="footerLinks">Contact Us</h4>
            </Link>
            <Link to="/csrStatement">
              <h4 className="footerLinks">CSR Statement</h4>
            </Link>
            <Link to="/greenInitiativeStatement">
              <h4 className="footerLinks">Green Initiative</h4>
            </Link>
          </div>
          <div className="membershipFeatures sectionLinks">
            <h3 className="linksTitle">Membership Features</h3>
            <Link to="/membershipInfo">
              <h4 className="footerLinks">Membership Benefits</h4>
            </Link>
            <Link to="/sellingInfo">
              <h4 className="footerLinks">How to Sell</h4>
            </Link>
          </div>
          <div className="giftCardInfo sectionLinks">
            <h3 className="linksTitle">Gift Cards</h3>
            <Link to="/giftCards">
              <h4 className="footerLinks">Purchase Gift Cards</h4>
            </Link>
            <Link to="/reloadGiftCard">
              <h4 className="footerLinks">Reload Gift Card</h4>
            </Link>
          </div>
          <div className="manageAccount sectionLinks">
            <h3 className="linksTitle">Manage Account</h3>
            <Link to="/accountDetails">
              <h4 className="footerLinks">Your Account</h4>
            </Link>
            <Link to="/orderHistory">
              <h4 className="footerLinks">Your Orders</h4>
            </Link>
            <Link to="/returns">
              <h4 className="footerLinks">Returns</h4>
            </Link>
            <Link to="/warranty">
              <h4 className="footerLinks">Warranty Policy</h4>
            </Link>
          </div>
          {/* <div className="footerButton">
            <button onClick={handleClick}>Close</button>
          </div> */}
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
      <HideFeature visible={visible} setVisible={setVisible} />
      {/* <div className="collapsedFooterParent"> */}
        <div className="collapsedFooter">
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
          <div className="footerButton" onClick={handleClick}>
            <button onClick={handleClick}>Open</button>
          </div>
        </div>
        <div className="collapedSocialMediaLinks">
          <div>
            <Link>
              <img src="" alt="" />
            </Link>
          </div>
          <div>
            <Link>
              <img src="" alt="" />
            </Link>
          </div>
          <div>
            <Link>
              <img src="" alt="" />
            </Link>
          </div>
          <div>
            <Link>
              <img src="" alt="" />
            </Link>
          </div>
        </div>
        {/* </div> */}
      </>}</>
  )
}
      
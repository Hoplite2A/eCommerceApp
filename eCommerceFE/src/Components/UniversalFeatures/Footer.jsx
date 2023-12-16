//! Imported Libraries -------------------------
import { Link } from 'react-router-dom';
//! --------------------------------------------

//! Imported Components ------------------------
//! --------------------------------------------

export default function Footer() {
    
    return (
        <div className="footer">
            <div className="getToKnowUs">
                <h4 className="linksTitle">Get to Know Us</h4>
                <Link to='/about'>
                    <h5 className='footerLinks'>About</h5>
                </Link>
                <Link to='/careers'>
                    <h5 className='footerLinks'>Careers</h5>
                </Link>
                <Link to='/contactUs'>
                    <h5 className='footerLinks'>Contact Us</h5>
                </Link>
                <Link to='/csrStatement'>
                    <h5 className='footgit push erLinks'>CSR Statement</h5>
                </Link>
                <Link to='/greenInitiativeStatement'>
                    <h5 className='footerLinks'>Green Initiative Statement</h5>
                </Link>
            </div>
            <div className="membershipFeatures">
                <h4 className="linksTitle">Membership Features</h4>
                <Link to='/membershipInfo'>
                    <h5 className="footerLinks">Membership Benefits</h5>
                </Link>
                <Link to='/sellingInfo'>
                    <h5 className="footerLinks">How to Sell</h5>
                </Link>
            </div>
            <div className="giftCardInfo">
                <h4 className="giftCards">Gift Cards</h4>
                <Link to='/giftCards'>
                    <h5 className="footerLinks">Purchase Gift Cards</h5>
                </Link>
                <Link to='/reloadGiftCard'>
                    <h5 className="footerLinks">Reload Gift Card</h5>
                </Link>
                <Link to=''>
                    <h5 className="footerLinks"></h5>
                </Link>
                <Link to=''>
                    <h5 className="footerLinks"></h5>
                </Link>
                <Link to=''>
                    <h5 className="footerLinks"></h5>
                </Link>
            </div>
        </div>
    )
}
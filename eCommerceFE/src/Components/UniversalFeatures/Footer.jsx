//! Imported Libraries -------------------------
import { Link } from 'react-router-dom';
//! --------------------------------------------

//! Imported Components ------------------------
//! --------------------------------------------

export default function Footer() {
    
    return (
        <div className="footer">
            <div className="footerLinkSection">
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
                </div>
                <div className="manageAccount">
                    <h4 className="linksTitle">Manage Account</h4>
                    <Link to='/accountDetails'>
                        <h5 className="footerLinks">Your Account</h5>
                    </Link>
                    <Link to='/orderHistory'>
                        <h5 className="footerLinks">Your Orders</h5>
                    </Link>
                    <Link to='/returns'>
                        <h5 className="footerLinks">Returns</h5>
                    </Link>
                    <Link to='/warranty'>
                        <h5 className="footerLinks">Warranty Policy</h5>
                    </Link>
                </div>
            </div>
            <div className="socialMediaLinks">
                <Link><img src="" alt="" /></Link>
                <Link><img src="" alt="" /></Link>
                <Link><img src="" alt="" /></Link>
                <Link><img src="" alt="" /></Link>
            </div>
        </div>
    )
}
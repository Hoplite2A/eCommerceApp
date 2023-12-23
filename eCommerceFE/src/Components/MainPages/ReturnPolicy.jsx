//! Imported Libraries --------------------------
import { Link } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
import Footer from "../UniversalFeatures/Footer";
import { companyName } from "../UniversalFeatures/Logo";
//! ---------------------------------------------

export default function ReturnPolicy() {
  const numOfDays = 30;

  <div className="articleDiv">

  </div>

  return (
    <>
        <Header />
        <h2 className="ReturnPolicyTitle">{companyName} Return Policy</h2>
      <div className="returnPolicyArticle">
        <div className="articleDiv">

          <h3 className="sectionHeaders">Eligibility</h3>
          <br></br>
          <p className='body'>Items eligible for return must be unused, in their original
          packaging, and accompanied by a valid proof of purchase. Certain
          items, such as perishables, personalized products, and downloadable
          software, are non-returnable.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Return Window</h3>
          <br></br>
          <p className='body'>Customers have {numOfDays} days from the date of delivery to
          initiate a return. After this period, returns may not be accepted.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Return Process</h3>
          <br></br>
          <p className='body'>To initiate a return, customers must contact our customer service
          team through the designated channels provided on our website. A
          return authorization (RA) number will be issued upon approval.</p>
        </div>
        <div className="articleDiv">
                
          <h3 className="sectionHeaders">Condition of Returned Items</h3>
          <br></br>
          <p className='body'>Returned items will be inspected upon receipt. Items must be in new,
          unused condition to be eligible for a refund. Any damage or signs of
          use may result in a partial refund or denial of the return.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Refund Method</h3>
          <br></br>
          <p className='body'>Refunds will be processed using the same method as the original
          payment. If the original payment method is unavailable, store credit
          will be issued.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Restocking Fee</h3>
          <br></br>
          <p className='body'>A restocking fee may apply to certain returns, especially
          for large or specialized items. This fee will be clearly
          communicated during the return authorization process.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Fraud Prevention</h3>
          <br></br>
          <p className='body'>To protect against fraudulent returns, we reserve the right to deny
          returns that exhibit suspicious patterns or abuse of our return
          policy.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Exclusions</h3>
          <br></br>
          <p className='body'>Certain items, as specified in the product description, are
          non-returnable. Additionally, final sale items are not eligible for
          return.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Return Shipping</h3>
          <br></br>
          <p className='body'>Customers are responsible for return shipping costs unless the
          return is due to an error on our part. We recommend using a
          trackable shipping method for returns.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">International Returns</h3>
          <br></br>
          <p className='body'>International returns may be subject to additional shipping fees and
          customs duties. Customers are responsible for these costs.</p>
        </div>
        <div className="articleDiv">

          <h3 className="sectionHeaders">Modification of the Policy</h3>
          <br></br>
          <p className='body'>We reserve the right to modify this return policy at any time.
          Customers will be notified of any changes through our official
          communication channels.</p>
        </div>
        <div className="articleDiv">
          <h3 className="sectionHeaders">Commitment to Customer Satisfaction</h3>
          <br></br>
          <p className='body'>Our goal is to provide a fair and transparent return process. If you
          have any concerns or questio      ns regarding our return policy, please
          contact our customer service team. We are here to assist you.</p>
        </div>
        <Link to="/">
          <p className="returnHome">Return Home</p>
        </Link>
      </div>
      <Footer />
    </>
  );
}

//! Imported Libraries --------------------------
import { Link } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CompanyName } from "../UniversalFeatures/Logo";
//! ---------------------------------------------

export default function ReturnPolicy() {
    
    const numOfDays = 30;
    
  return (
    <>
      <div className="ReturnPolicyArticle">
        <article>
          <h2 className="ReturnPolicyTitle">{CompanyName} Return Policy</h2>
          <p className="ReturnPolicyBody">
                      <h2>Eligibility</h2>
                      <br></br>Items eligible for return must be unused,
                      in their original packaging, and accompanied by a valid proof of purchase.
                      Certain items, such as perishables, personalized products, and downloadable
                      software, are non-returnable.
                      <br></br>
                      <br></br>
                      <h2>Return Window</h2>
                      <br></br>
                      Customers have {numOfDays}] days from the date of delivery to initiate a return.
                      After this period, returns may not be accepted.
                      <br></br>
                      <br></br>
                      <h2>Return Process</h2>
                      <br></br>
                      To initiate a return, customers must contact our customer service team
                      through the designated channels provided on our website. A return
                      authorization (RA) number will be issued upon approval.
                      <br></br>
                      <br></br>
                      <h2>Condition of Returned Items</h2>
                      <br></br>
                      Returned items will be inspected upon receipt. Items must be in new, unused
                      condition to be eligible for a refund. Any damage or signs of use may result
                      in a partial refund or denial of the return.
                      <br></br>
                      <br></br>
                      <h2>Refund Method</h2><br></br>
                      Refunds will be processed using the same method as the original payment. If
                      the original payment method is unavailable, store credit will be issued.
                      <br></br>
                      <br></br>
                      <h2>Restocking Fee</h2>
                      <br></br>
                      A restocking fee may apply to certain returns, especially for large or
                      specialized items. This fee will be clearly communicated during the return
                      authorization process.
                      <br></br>
                      <br></br>
                      <h2>Fraud Prevention</h2>
                      <br></br>
                      To protect against fraudulent returns, we reserve the right to deny
                      returns that exhibit suspicious patterns or abuse of our return policy.
                      <br></br>
                      <br></br>
                      <h2>Exclusions</h2>
                      <br></br>
                      Certain items, as specified in the product description, are non-returnable.
                      Additionally, final sale items are not eligible for return.
                      <br></br>
                      <br></br>
                      <h2>Return Shipping</h2>
                      <br></br>
                      Customers are responsible for return shipping costs unless the return is
                      due to an error on our part. We recommend using a trackable shipping method
                      for returns.
                      <br></br>
                      <br></br>
                      <h2>International Returns</h2>
                      <br></br>
                      International returns may be subject to additional shipping fees and
                      customs duties. Customers are responsible for these costs.
                      <br></br>
                      <br></br>
                      <h2>Modification of the Policy</h2>
                      <br></br>
                      We reserve the right to modify this return policy at any time. Customers
                      will be notified of any changes through our official communication channels.
                      <br></br>
                      <br></br>
                      <h2>Commitment to Customer Satisfaction</h2>
                      <br></br>
                      Our goal is to provide a fair and transparent return process. If you have
                      any concerns or questions regarding our return policy, please contact
                      our customer service team. We are here to assist you.
          </p>
        </article>
        <Link to="/">
          <button className="returnToHome">Return to Home</button>
        </Link>
      </div>
    </>
  );
}

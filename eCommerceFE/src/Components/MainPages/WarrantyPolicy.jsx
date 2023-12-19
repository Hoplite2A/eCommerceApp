//! Imported Libraries --------------------------
import { Link } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { CompanyName } from "../UniversalFeatures/Logo";
//! ---------------------------------------------

export default function WarrantyPolicy() {
  return (
    <>
      <div className="WarrantyPolicyArticle">
        <article>
          <h2 className="WarrantyPolicyTitle">{CompanyName} Warranty Policy</h2>
          <p className="WarrantyPolicyBody">
            <h3>Coverage Period</h3> <br></br>Our products are covered by a limited warranty
            for a specified period from the date of purchase. Details of the
            coverage duration are provided in the product documentation.
            <br></br>
            <h3>Warranty Scope</h3> <br></br>This warranty covers manufacturing defects and
            malfunctions under normal use conditions. It does not cover damage
            caused by misuse, accidents, unauthorized modifications, or any
            other non-manufacturing issues.<br></br>
            <h3>Remedies</h3> <br></br>In the event of a covered defect, we will, at our
            discretion, repair or replace the product. If a replacement is not
            available, an equivalent product or store credit will be provided.
            <br></br>
            <h3>Warranty Claim Process</h3> <br></br> To initiate a warranty claim, customers
            must provide proof of purchase and a detailed description of the
            issue. Contact our customer service department through the
            designated channels outlined in the product documentation.<br></br>
            <h3>Exclusion</h3> <br></br>This warranty does not cover consumable parts, normal
            wear and tear, cosmetic damage, or damage resulting from
            unauthorized repairs or alterations.<br></br>
            <h3>Limits of Liability</h3> <br></br> Our liability is limited to the repair,
            replacement, or credit value of the product. We are not liable for
            any incidental or consequential damages, including but not limited
            to loss of profits or data.<br></br>
            <h3>Transferability</h3> <br></br>This warranty is non-transferable and applies
            only to the original purchaser.<br></br>
            <h3>Modifications to the Policy</h3> <br></br>We reserve the right to modify the
            terms of this warranty policy at any time. Customers will be
            informed of any changes through our official communication channels.
            <br></br>
            <h3>Governing Law</h3> <br></br>This warranty policy is governed by the laws of
            the United State of America and its member States, and any disputes
            will be resolved in accordance with these laws.<br></br>
            <h3>Commitment to Customer Satisfaction</h3> <br></br>We are committed to
            providing quality products and ensuring customer satisfaction. If
            you have any concerns or questions regarding our warranty policy,
            please contact our customer service team. This warranty policy aims
            to balance the interests of both the consumer and the business,
            fostering a transparent and fair relationship.
          </p>
        </article>
        <Link to="/">
          <button className="returnToHome">Return to Home</button>
        </Link>
      </div>
    </>
  );
}

//! Imported Libraries --------------------------
import { Link } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { companyName } from "../UniversalFeatures/Logo";
//! ---------------------------------------------

export default function CSRStatement() {
  return (
    <>
      <div className="CSRArticle">
        <article>
          <h2 className="CSRStatementTitle">CSR Statement</h2>
          <p className="CSRStatementBody">
            At {companyName}, we proudly uphold conservative Corporate Social
            Responsibility values. Rooted in ethical practices and
            sustainability, we strive to make a positive impact across all age
            groups and political spectrums. Our commitmentto fair labor,
            environmental stewardship, and community engagement reflects our
            dedication to a responsible and inclusive business model. Join us in
            fostering a better future for everyone.
//TODO ------- REMOVE Line 24
            ;lzkjdhglkjzhxfkljghd;kjghbz;dkgbp;zkusddfhgadsfg
          </p>
        </article>
        <Link to="/">
          <button className="returnToHome">Return to Home</button>
        </Link>
      </div>
    </>
  );
}

//! Imported Libraries --------------------------
import { Link } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { companyName } from "../UniversalFeatures/Logo";
//! ---------------------------------------------

export default function GreenInitiativeStatement() {
  return (
    <>
      <div className="GreenInitiativeArticle">
        <article>
          <h2 className="GreenInitiativeStatementTitle">
            Green Initiative Statement
          </h2>
          <p className="GreenInitiativeStatementBody">
            {/* Use the following CSS to indent the start of this 
                    paragraph:
                    .GreenInitiativeStatementBody {
                    test-indent:30px;
                    } */}
            At {companyName}, we are embarking on a transformative journey
            toward carbon neutrality, inspired by the pioneering efforts of
            major corporations in the USA and developed European nations. Our
            commitment extends beyond borders as we adopt sustainable practices,
            reduce emissions, and invest in eco-friendly technologies. Join us
            in forging a cleaner, greener future, as we strive to balance our
            carbon footprint and contribute to a more sustainable planet.
          </p>
        </article>
        <Link to="/">
          <button className="returnToHome">Return to Home</button>
        </Link>
      </div>
    </>
  );
}

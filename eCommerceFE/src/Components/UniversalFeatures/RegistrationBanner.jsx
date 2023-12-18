//! Imported Libraries --------------------------
import { Link } from "react-router-dom";
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
// None at this point in time.
//! ---------------------------------------------

export default function RegistrationBanner() {
  const [visible, setVisible] = useState(true);

  const closeButton = () => setVisible(false);

  return (
    <>
      {visible && (
        <div className="regBanner">
          <div className="regBannerMessageAndButton">
            <div className="message">
              <p className="regBannerText">
                Register now and take advantage of our benefits
              </p>
            </div>
            <div className="regRedirectButton">
              <Link to="/registration">
                <button className="regBannerButton">REGISTER NOW</button>
              </Link>
            </div>
          </div>
          <div className="regBannerClose">
            <button className="regCloseButton" onClick={closeButton}>
              <img
                src="../assets/RegBannerCloseButton"
                alt="Button to close Registartion Banner"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

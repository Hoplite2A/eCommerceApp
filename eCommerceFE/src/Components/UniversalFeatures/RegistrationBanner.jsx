//! Imported Libraries --------------------------
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
// None at this point in time.
//! ---------------------------------------------


export default function RegistrationBanner() {
  
  const [visible, setVisible] = useState(true);
  const closeButton = () => setVisible(false);
  
  const navigate = useNavigate();
  const registerButton = () => {
    navigate('/register');
  };

  return (
    <>
      {/*------------------Style this Banner! ------------  */}
      {visible && (
        <div className="regBanner">
          <div className="regBannerMessageAndButton">
            <div className="message">
              <p className="regBannerText">
                REGISTER NOW AND TAKE ADVANTAGE OF MEMBERSHIP BENEFITS!
              </p>
            </div>
            <div className="regRedirectButton">
              <button className="regBannerButton" onClick={registerButton}>
                REGISTER NOW!
              </button>
              <button className="regCloseButton" onClick={closeButton}>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
      {/*------------------Style this Banner! ------------  */}
    </>
  );
}

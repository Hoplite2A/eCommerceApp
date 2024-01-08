//! Imported Libraries --------------------------
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { token } from "./Login";
//! ---------------------------------------------

export default function RegistrationBanner() {
  
  const [visible, setVisible] = useState(true);
  const closeButton = () => setVisible(false);
  
  const navigate = useNavigate();
  const registerButton = () => {
    navigate('/register');
  };

  return (<>
    {visible && !token.value ? <>
      <div className="regBanner">
        <div className="regBannerMessageAndButton">
          <div className="message">
            <p className="regBannerText">
              REGISTER NOW AND TAKE ADVANTAGE OF MEMBERSHIP BENEFITS!
            </p>
          </div>
          <div className="regRedirectButton">
            <button className="regBannerButton" onClick={registerButton}>
              SIGN UP NOW!
            </button>
            <button className="regCloseButton" onClick={closeButton}>
              MAYBE LATER
            </button>
          </div>
        </div>
      </div>
    </> :
      null
    }
  </>);
}

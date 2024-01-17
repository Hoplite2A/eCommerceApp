//! Imported Libraries --------------------------
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
// import CartPreview from '../LoggedInFeatures/CartPreview';
// import WishlistPreview from '../LoggedInFeatures/WishlistPreview';
// import PastPurhcases from '../UniversalFeatures/PastPurhcases';
import Footer from "../UniversalFeatures/Footer";
import PastPurchasesPreview from "./PastPurchases/PastPurchasesPreview";
import { token } from "../../Components/UniversalFeatures/Login";
import { userDetails } from "../../Components/UniversalFeatures/Login";
import { BASE_URL } from "../../App";
//! ---------------------------------------------

export default function AccountDetails() {
  useEffect(() => {
    console.log("AccountDetails mounted");
    return () => {
      console.log("AccountDetails unmounted");
    };
  }, []);
  console.log("in account details");
  const navigate = useNavigate();

  const nothing = () => {
    navigate("/");
  };

  const [passwordResetVisible, setPasswordResetVisible] = useState(true);

  console.log('Testing');
  
  //Deconstructed Signal Variable pulled from login.jsx &&|| Registration.jsx and utilized for current (non-edit) data view:
  //? pass was left out for the time being until method of toggling visibility of data is created.
  const {
    username,
    first_name,
    preferred_name,
    last_name,
    address,
    apartment,
    city,
    state,
    zip,
    phone,
    email,
  } = userDetails.value;
  console.log('Testing');

  //Used for pulling changed values from
  const [userName, setUserName] = useState(username);
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState(first_name);
  const [pName, setPName] = useState(preferred_name);
  const [lName, setLName] = useState(last_name);
  const [streetAddress, setStreetAddress] = useState(address);
  const [aApt, setAApt] = useState(apartment);
  const [aCity, setACity] = useState(city);
  const [aState, setAState] = useState(state);
  const [aZip, setAZip] = useState(zip);
  const [cNumber, setCNumber] = useState(phone);
  const [emailAddress, setEmailAddress] = useState(email);

  const [updateInfo, setUpdateInfo] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState("");
  console.log('Testing');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/updateprofile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token.value}`,
        },
        body: JSON.stringify({
          firstName: fName,
          preferred_name: pName,
          lastName: lName,
          street: streetAddress,
          apartment: aApt,
          city: aCity,
          state: aState,
          zip: aZip,
          phone: cNumber,
          emailAddress: email,
          user: userName,
        }),
      });
      const json = await res.json();

      if (json.message === "Profile has been updated Successfully") {
        //TODO --------------------- Update alert to acknowledgement
        alert(`${fName}, your profile has been successfully updated.`);
      } else {
        console.log("An error occurred when performing update.");
      }
    } catch (err) {
      console.log(
        `An Error occurred within the handleSubmit function for the Profile Patch, ${err}.`
      );
    }
  };
  console.log('Testing');

  //TODO ---------- Need to add path in BE for password update POST
  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/u`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const json = await res.json();
      const verdict = await json.code;
      //! ------------------------- Add BE Logic for this return value
      if (verdict === 1) {
        setPasswordResetVisible(!passwordResetVisible);
      }
    } catch (err) {
      console.log(
        `Error occurred in handlePasswordReset within the AccountDetails component, ${err}.`
      );
    }
  };
  console.log('Testing');

  //TODO ---------- Need to add path in BE for password update POST
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${BASE_URL}/u`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          password: updatedPassword,
        }),
      });
      const json = await res.json();
      const update = await json.code;
      //! ------------------------- Add BE Logic for this return value
      if (update === 1) {
        setPasswordResetVisible(true);
      }
      alert(`${fName}, your password has been successfully updated.`);
    } catch (err) {
      console.log(
        `Error occurred in handlePasswordReset within the AccountDetails component, ${err}.`
      );
    }
  };
  console.log('Testing');

  return (
    <>
    <Header />
      {token.value ? (
        <>
          <div className="accountDetailsDiv">
            <div className="accountDetailsTopHalf">
              <form className="accountDetails" onSubmit={handleSubmit}>
                <div className="userAccountDetails">
                  {/* Profile Image */}
                  <h2 className="accountDetailsTitle">Hi, {first_name}</h2>
                </div>
                <div className="ADNameFields">
                  <label htmlFor="fistName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={first_name}
                    onChange={(e) => setFName(e.target.value)}
                  />
                  <label htmlFor="preferredName">Nick Name:</label>
                  <input
                    type="text"
                    id="preferredName"
                    name="preferredName"
                    value={preferred_name}
                    onChange={(e) => setPName(e.target.value)}
                  />
                  <label htmlFor="lastName">LastName:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={last_name}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>
                <div className="ADStreetAddress1">
                  <label htmlFor="street1">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={address}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                  <label htmlFor="">APT/Unit</label>
                  <input
                    type="text"
                    id="Apt"
                    name="Apt"
                    value={apartment}
                    onChange={(e) => setAApt(e.target.value)}
                  />
                </div>
                <div className="ADStreetAddress2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setACity(e.target.value)}
                  />
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={state}
                    onChange={(e) => setAState(e.target.value)}
                  />
                  <label htmlFor="zip">ZIP:</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={zip}
                    onChange={(e) => setAZip(e.target.value)}
                  />
                </div>
                <div className="ADContactInfo">
                  <label htmlFor="phone"></label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setCNumber(e.target.value)}
                  />
                  <label htmlFor="emailAddress"></label>
                  <input
                    type="text"
                    id="emailAddress"
                    name="emailAddress"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>
                <div className="ADCredententials">
                  <label htmlFor="user">Username</label>
                  <input
                    type="text"
                    id="user"
                    name="user"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={updateInfo}
                  />
                  {!passwordResetVisible ? (
                    <>
                      <label htmlFor="pass">Enter Current Password</label>
                      <input
                        type="text"
                        id="pass"
                        name="pass"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="resetPassword"
                        onClick={handlePasswordReset}
                      >
                        Reset
                      </button>
                    </>
                  ) : (
                    <>
                      <label htmlFor="pass">Enter New Password</label>
                      <input
                        type="text"
                        id="pass"
                        name="pass"
                        onChange={(e) => setUpdatedPassword(e.target.value)}
                      />
                      <button
                        className="resetPasswordRequest"
                        onClick={handlePasswordResetRequest}
                      >
                        Reset
                      </button>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  className="ADSaveChangesButton"
                  onClick={()=>setUpdateInfo(!updateInfo)}
                >
                  Edit Info
                </button>
                {updateInfo ? (
                  <>
                    <button type="submit" className="ADSaveChangesButton">
                      Save Changes
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </form>
            </div>
            <div className="cartWishlistPreview">
              <div className="cartPreview">{/* <CartPreview /> */}</div>
              <div className="wishlistPreview">{/* <WishlistPreview /> */}</div>
            </div>
            <div className="accountDetailsBottomHalf">
              {/* <PastPurchases /> */}
            </div>
          </div>
          <PastPurchasesPreview />
        </>
      ) : (
        <>
            <button className="goHome" onClick={nothing}>
              Nothing to see here.
            </button>
        </>
      )}
    <Footer />
    </>
  );
}

//! Imported Libraries --------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
import Footer from "../UniversalFeatures/Footer";
import { token } from "../../Components/UniversalFeatures/Login";
import { userDetails } from "../../Components/UniversalFeatures/Login";
import { BASE_URL } from "../../App";
//! ---------------------------------------------


export default function AccountDetails() {
  
  
  
  const navigate = useNavigate();
  
  const nothing = () => {
    navigate('/');
  }

  const [passwordResetVisible, setPasswordResetVisible] = useState(false);

  //Deconstructed Signal Variable pulled from login.jsx &&|| Registration.jsx and utilized for current (non-edit) data view:
  //? pass was left out for the time being until method of toggling visibility of data is created.
  const {
    first_name,
    preferred_name,
    last_name,
    address,
    apartment,
    city,
    state,
    zip,
    // phoneType,
    phone,
    email,
    username,
  } = userDetails.value;

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
  // const [cType, setCType] = useState("");
  const [cNumber, setCNumber] = useState(phone);
  const [emailAddress, setEmailAddress] = useState(email);

  const [updateInfo, setUpdateInfo] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState("")

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
          // phoneType: cType,
          phone: cNumber,
          emailAddress: email,
          user: userName,
        }),
      });
      const json = res.json();

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

  //TODO ---------- Need to add path in BE for password update POST
  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`${BASE_URL}/u`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
      const json = res.json();
      const verdict = json.code;
      //! ------------------------- Add BE Logic for this return value
      if (verdict === 1) {
        setPasswordResetVisible(true);
      }
    }
    catch (err) {
      console.log(`Error occurred in handlePasswordReset within the AccountDetails component, ${err}.`);
    }
  }

  //TODO ---------- Need to add path in BE for password update POST
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`${BASE_URL}/u`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          password: updatedPassword
        }),
      });
      const json = res.json();
      const update = json.code;
      //! ------------------------- Add BE Logic for this return value
      if (update === 1) {
        setPasswordResetVisible(true);
      }
      alert(`${fName}, your password has been successfully updated.`)
    }
    catch (err) {
      console.log(`Error occurred in handlePasswordReset within the AccountDetails component, ${err}.`);
    }
  }

  return (
    <>
      {token.value && userDetails.value ? (
        <>
          <Header />
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
              {/* <label htmlFor="phoneType">Phone Type:</label>
              <input
                type="text"
                id="phoneType"
                name="phoneType"
                value={phoneType}
                onChange={(e) => setCType(e.target.value)}
              /> */}
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
              {!passwordResetVisible ? (<>
                <label htmlFor="pass">Enter Current Password</label>
                <input
                  type="text"
                  id="pass"
                  name="pass"
                  onChange={(e) => setPassword(e.target.value)}
                />
                </>) : (<>
                <label htmlFor="pass">Enter New Password</label>
                <input
                  type="text"
                  id="pass"
                  name="pass"
                  onChange={(e) => setUpdatedPassword(e.target.value)}
                />
                </>)}
              {passwordResetVisible ? (
                <>
                  <button className="resetPasswordRequest"
                    onClick={handlePasswordResetRequest}>Reset</button>
                </>
              ) : (
                <>
                <button className="resetPassword"
                  onClick={handlePasswordReset}>Reset</button>
                </>
                )}
            </div>
            {!updateInfo ? <>
              <button type="button" className="ADSaveChangesButton" onClick={setUpdateInfo(!updateInfo)}>
                Edit Info
              </button>
            </> : <>
              <button type="submit" className="ADSaveChangesButton">
                Save Changes
              </button>
            </>}
          </form>
          <Footer />     
        </>
      ) : (
        <>
          <button className="goHome" onClick={nothing}>Nothing to see here.</button>
        </>    
      )}
    </>
  );
}

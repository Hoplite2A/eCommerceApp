//! Imported Libraries --------------------------
import { useState, useEffect } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
import Footer from "../UniversalFeatures/Footer";
import { token } from "../../Components/UniversalFeatures/Login";
import { BASE_URL } from "../../App";
//! ---------------------------------------------

export default function AccountDetails() {
  //Used for making certain data visible as a security precaution:
  const [visible, setVisible] = useState(false);

  //Used for defining data from GET API upon initial page landing:
  const [details, setDetails] = useState("");
  //Deconstructed State Variable pulled from GET API and utilized for current (non-edit) data view:
  //? pass was left out for the time being until method of toggling visibility of data is created.
  const {
    firstName,
    preferredName,
    lastName,
    street,
    apartment,
    city,
    state,
    zip,
    phoneType,
    phoneNumber,
    emailAddress,
    user,
  } = details;

  //Used for pulling changed values from
  const [fName, setFName] = useState("");
  const [pName, setPName] = useState("");
  const [lName, setLName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aApt, setAApt] = useState("");
  const [aCity, setACity] = useState("");
  const [aState, setAState] = useState("");
  const [aZip, setAZip] = useState("");
  const [cType, setCType] = useState("");
  const [cNumber, setCNumber] = "";
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //Used for making Reset password feature visible to end user:
  const [passwordResetVisible, setPasswordResetVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
        body: JSON.stringify({
          firstName: fName,
          preferredName: pName,
          lastName: lName,
          street: streetAddress,
          apartment: aApt,
          city: aCity,
          state: aState,
          zip: aZip,
          phoneType: cType,
          phoneNumber: cNumber,
          emailAddress: email,
          user: userName,
          pass: password,
        }),
      });
      const json = res.json();

      if (json.message === "Profile has been updated Successfully") {
        //TODO -------------------------------- Update alert to acknowledgement
        alert(`${firstName}, your profile has been successfully updated.`);
      } else {
        console.log("An error occurred when performing update.");
      }
    } catch (err) {
      console.log(
        `An Error occurred within the handleSubmit function for the Profile Patch, ${err}.`
      );
    }
  };

  if (token) {
    setVisible(true);
  }

  useEffect(() => {
    async function fetchAccountDetails() {
      try {
        const res = await fetch(`${BASE_URL}accountDetails`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            //TODO -------------------------------- Add body values for GET API
          }),
        });
        const json = await res.json();
        setDetails(json);
      } catch (err) {
        console.log(
          `An Error occurred within the fetchAccountDetails API Call, ${err}`
        );
      }
    }
    return () => fetchAccountDetails();
  }, []);

  return (
    <>
      {visible && details ? (
              <>
            <Header />
          <form className="accountDetails" onSubmit={handleSubmit}>
            <div className="userAccountDetails">
              {/* Profile Image */}
              <h2 className="accountDetailsTitle">Hi, {firstName}</h2>
            </div>
            <div className="ADNameFields">
              <label htmlFor="fistName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFName(e.target.value)}
              />
              <label htmlFor="preferredName">Nick Name:</label>
              <input
                type="text"
                id="preferredName"
                name="preferredName"
                value={preferredName}
                onChange={(e) => setPName(e.target.value)}
              />
              <label htmlFor="lastName">LastName:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
            <div className="ADStreetAddress1">
              <label htmlFor="street1">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={street}
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
              <label htmlFor="phoneType">Phone Type:</label>
              <input
                type="text"
                id="phoneType"
                name="phoneType"
                value={phoneType}
                onChange={(e) => setCType(e.target.value)}
              />
              <label htmlFor="phoneNumber"></label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setCNumber(e.target.value)}
              />
              <label htmlFor="emailAddress"></label>
              <input
                type="text"
                id="emailAddress"
                name="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="ADCredententials">
              <label htmlFor="user">Username</label>
              <input
                type="text"
                id="user"
                name="user"
                value={user}
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className="resetPassword">
                <label className="passCheckBox">
                  <input
                    type="checkbox"
                    id="resetPassword"
                    onChange={setPasswordResetVisible(!passwordResetVisible)}
                  />
                </label>
                {passwordResetVisible ? (
                  <>
                    <label htmlFor="pass">Reset Password</label>
                    <input
                      type="text"
                      id="pass"
                      name="pass"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <button type="submit" className="ADSaveChangesButton">
              Save Changes
            </button>
          </form>
        <Footer />     
        </>
      ) : (
        <></>
      )}
    </>
  );
}

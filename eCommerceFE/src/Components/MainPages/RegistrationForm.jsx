//! Imported Libraries --------------------------
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
import { BASE_URL } from "../../App";
import { token } from "../UniversalFeatures/Login";
import Footer from "../UniversalFeatures/Footer";
//! ---------------------------------------------

export default function RegisterForm() {
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

  //TODO -------------- Part of Validation Attempt
  //! const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO ---- Add validation of register fields and return
    //TODO ---- a setvalid(true) prior to POST API Call
    //! if else OR Switch Statement
    //! return setValid(true);

    // if (valid) {
    try {
      const res = await fetch(`${BASE_URL}registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      const authToken = json.token;
      console.log(authToken);
      token.value = authToken;
    } catch (err) {
      console.log(`Error occurred in RegisterForm function, ${err}`);
      alert(err);
    }

    //! -----------------------------------Redirect if registration/api fails-----------
    if (token.value !== null) {
      navigate("/");
    } else {
      //TODO ----- Enter in code that will pull error messages from BE on whether it is a dataType error or
      //TODO ----- if it is an user already has those credentials.
      alert(
        "Either a user with these credentials exist, or you entered in an invalid value. Please reattempt."
      );
    }
  };

  return (
    <>
      <Header />
      <div className="registrationFormDiv">
        <form className="registrationForm" onSubmit={handleSubmit}>
          <h2 className="registrationFormMessage">SIGN UP HERE!</h2>
          <div className="nameFields">
            <label className="regLabels">
              <input
                className="regInputs nameInputs"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                onChange={(e) => {
                  setFName(e.target.value);
                }}
              />
            </label>
            <label className="regLabels">
              <input
                className="regInputs nameInputs"
                type="text"
                id="preferredName"
                name="preferredName"
                placeholder="Preferred Name"
                onChange={(e) => {
                  setPName(e.target.value);
                }}
              />
            </label>
            <label className="regLabels">
              <input
                className="regInputs nameInputs"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) => {
                  setLName(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="contactInfo">
            <div className="streetAddress1">
              <label className="regLabels">
                <input
                  className="streetAddressInput street1Input"
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Street Address"
                  onChange={(e) => {
                    setStreetAddress(e.target.value);
                  }}
                />
              </label>
              <label className="regLabels">
                <input
                  className="streetAddressInput aptInput"
                  type="text"
                  id="apartment"
                  name="apartment"
                  placeholder="APT/UNIT"
                  onChange={(e) => {
                    setAApt(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="streetAddress2">
              <label className="regLabels">
                <input
                  className="cityAddressInput"
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  onChange={(e) => {
                    setACity(e.target.value);
                  }}
                />
              </label>
              <label className="regLabels">
                <input
                  className="cityAddressInput"
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  onChange={(e) => {
                    setAState(e.target.value);
                  }}
                />
              </label>
              <label className="regLabels">
                <input
                  className="cityAddressInput"
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="ZIP Code"
                  onChange={(e) => {
                    setAZip(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="contactInfo2">
              <label className="regLabels">
                <input
                  className="regInputs contactInputs"
                  type="text"
                  id="phoneType"
                  name="phoneType"
                  placeholder="Phone Type"
                  onChange={(e) => {
                    setCType(e.target.value);
                  }}
                />
              </label>
              <label className="regLabels">
                <input
                  className="regInputs contactInputs"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setCNumber(e.target.value);
                  }}
                />
              </label>
              <label className="regLabels">
                <input
                  className="regInputs contactInputs"
                  type="text"
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="createCredentials">
            <label className="regLabels">
              <input
                className="regInputs credInputs"
                type="text"
                id="user"
                name="user"
                placeholder="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </label>
            <label className="regLabels">
              <input
                className="regInputs credInputs"
                type="password"
                id="pass"
                name="pass"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="regFormButtons">
            <button className="regSubmitButton button1" onClick={handleSubmit}>Submit</button>
            <button className="regGoBackButton button2" onClick={goBack}>Maybe Later</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
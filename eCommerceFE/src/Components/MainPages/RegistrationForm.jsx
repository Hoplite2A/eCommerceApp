//! Imported Libraries --------------------------
import { useNavigate } from "react-reouter-dom";
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { BASE_URL } from "../../App";
import { token } from "../UniversalFeatures/Login";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    //TODO ---- Add validation of register fields and return
    //TODOD ----a setvalid(true) prior to POST API Call
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
      <form className="registrationForm" onSubmit={handleSubmit}>
        <h2 className="registrationFormMessage">Sign Up Here!</h2>
        <div className="nameFields">
          <label className="regLabels">
            <input
              className="regInputs"
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
              className="regInputs"
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
              className="regInputs"
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
            <label className="regLabel">
              <input
                className="streetAddressInput"
                type="text"
                id="street"
                name="street"
                placeholder="Street Address"
                onChange={(e) => {
                  setStreetAddress(e.target.value);
                }}
              />
            </label>
            <label className="regLabel">
              <input
                className="apartmentAddressInput"
                type="text"
                id="apartment"
                name="apartment"
                placeholder="APT/UNIT"
                value={""}
                onChange={(e) => {
                  setAApt(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="streetAddress2">
            <label className="regLabel">
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
            <label className="regLabel">
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
            <label className="regLabel">
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
          <div className="contactInfo">
            <label className="regLabels">
              <input
                className="regInputs"
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
                className="regInputs"
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
                className="regInputs"
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
              className="regInputs"
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
              className="regInputs"
              type="text"
              id="pass"
              name="pass"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
      </form>
    </>
  );
}

module.exports = { token };

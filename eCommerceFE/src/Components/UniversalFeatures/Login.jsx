/* eslint-disable react-refresh/only-export-components */
//! Imported Libraries --------------------------
import { useNavigate } from "react-router-dom";
import { signal } from "@preact/signals-react";
import { useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "./Navigation/Header";
import { companyName } from "./Logo";
import Footer from "./Footer";
import { BASE_URL } from "../../App";
//! ---------------------------------------------

export const userDetails = signal(null);
export const token = signal(null);

export default function Login() {
  
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });
      //! ---------------- Add response if no user found button - reattempt and go to login or
      //! ---------------- button link to registration form
      const json = await res.json();
      setErrorMessage(json.message);
      const acctDetails = await json.user;
      userDetails.value = await acctDetails;
      const tempToken = await json.token;
      token.value = tempToken;
    } catch (err) {
      console.log(`Login function error durring handleSubmit, ${err}`);
    }

    if (!token.value) {
      alert(`${errorMessage}`);
      navigate("/login");
    } else {
      alert(`You have successfully logged in.`);
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <div className="loginFormDiv">
        <form className="loginForm lF1" onSubmit={handleSubmit}>
          <h2 className="loginMessage">Login Here!</h2>
          <div className="formFields">
            <label className="loginLabels">
              <input
                className="loginInputs credInputs loginCredsInput1"
                type="text"
                id="user"
                name="user"
                placeholder="User Name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </label>
            <label className="loginLabels">
              <input
                className="loginInputs credInputs loginCredsInput2"
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
          <div className="loginButton2">
            <button className="loginButton lB2" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="newUser">
          <p className="newUserMessage">
            New to {companyName}?<br></br>Sign up and start exploring all the
            benefits!
          </p>
          <div className="signUpButtonDiv">
            <button className="signUpButton" onClick={redirect}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

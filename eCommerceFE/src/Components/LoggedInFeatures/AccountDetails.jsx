//! Imported Libraries --------------------------
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
import AccountDetailListItems from "./AccountDetailListItems";
import AccountDetailWishlistItems from "./AccountDetailWishlistItems";
// import PastPurhcases from '../UniversalFeatures/PastPurhcases';
import PastPurchasesPreview from "./PastPurchases/PastPurchasesPreview";
import Footer from "../UniversalFeatures/Footer";
import { token } from "../../Components/UniversalFeatures/Login";
import { userDetails } from "../../Components/UniversalFeatures/Login";
import { BASE_URL } from "../../App";
import CartSubTotal from "../UniversalFeatures/Cart/CartSubTotal";
import WishlistSubTotalComp from "./WishlistSubTotal";
import { CartWishlistContext } from "../../Contexts/CartWishlistContextProvider";
//! ---------------------------------------------

export default function AccountDetails() {
  const { localCart, localWishlist, cart } = useContext(CartWishlistContext);
  const [passwordResetVisible, setPasswordResetVisible] = useState(false);

  //*Rendering the Current Cart -----------------
  // const currentCart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {}, [cart]);
  //*--------------------------------------------

  //*Rendering the Current Wishlist -------------
  let currentWishlist = JSON.parse(localStorage.getItem("wishlist"));
  if (!currentWishlist) {
    currentWishlist = [];
  }
  useEffect(() => {}, [localWishlist]);
  //*--------------------------------------------

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
  const [updateInfo, setUpdateInfo] = useState(true);
  const [updatedPassword, setUpdatedPassword] = useState(false);

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

  return (
    <>
      <Header />
      {token.value ? (
        <>
          <div className="gridContainer">
            <div className="aDGrid">
              <form className="accountDetails" onSubmit={handleSubmit}>
                <div className="userAccountDetails">
                  {/* Profile Image */}
                  <h2 className="accountDetailsTitle">Hi, {preferred_name}</h2>
                </div>
                <div className="ADNameFields">
                  <label>
                    First Name:
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder={first_name}
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </label>
                  <label>
                    Nick Name:
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="preferredName"
                      name="preferredName"
                      value={preferred_name}
                      onChange={(e) => setPName(e.target.value)}
                    />
                  </label>
                  <label>
                    LastName:
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={last_name}
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="ADStreetAddress1">
                  <label>
                    Street
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="street"
                      name="street"
                      value={address}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                  </label>
                  <label>
                    APT/Unit
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="Apt"
                      name="Apt"
                      value={apartment}
                      onChange={(e) => setAApt(e.target.value)}
                    />
                  </label>
                </div>
                <div className="ADStreetAddress2">
                  <label>
                    City
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setACity(e.target.value)}
                    />
                  </label>
                  <label>
                    State:
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="state"
                      name="state"
                      value={state}
                      onChange={(e) => setAState(e.target.value)}
                    />
                  </label>
                  <label>
                    ZIP:
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="zip"
                      name="zip"
                      value={zip}
                      onChange={(e) => setAZip(e.target.value)}
                    />
                  </label>
                </div>
                <div className="ADContactInfo">
                  <label>
                    Phone
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setCNumber(e.target.value)}
                    />
                  </label>
                  <label>
                    Email Address
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="emailAddress"
                      name="emailAddress"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </label>
                </div>
                <div className="ADCredententials">
                  <label>
                    Username
                    <input
                      className="accountDetailsInputs"
                      type="text"
                      id="user"
                      name="user"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={updateInfo}
                    />
                  </label>
                  {!passwordResetVisible ? (
                    <>
                      <label>
                        Enter Current Password
                        <input
                          className="accountDetailsInputs"
                          type="password"
                          id="pass"
                          name="pass"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </label>
                      <button
                        className="resetPassword"
                        onClick={handlePasswordResetRequest}
                      >
                        Reset
                      </button>
                    </>
                  ) : (
                    <>
                      <label>
                        Enter New Password
                        <input
                          className="accountDetailsInputs"
                          type="password"
                          id="pass"
                          name="pass"
                          onChange={(e) => setUpdatedPassword(e.target.value)}
                        />
                      </label>
                      <button
                        className="resetPassword"
                        onClick={handlePasswordReset}
                      >
                        Reset
                      </button>
                    </>
                  )}
                </div>
                {/* ---------------------------Check the UDPATE INFO STATE VAR---------------------------------------------- */}
                {updateInfo ? (
                  <>
                    <button
                      type="button"
                      className="ADSaveChangesButton"
                      onClick={setUpdateInfo(!updateInfo)}
                    >
                      Edit Info
                    </button>
                  </>
                ) : (
                  <>
                    <button type="submit" className="ADSaveChangesButton">
                      Save Changes
                    </button>
                  </>
                )}
              </form>
              <div className="aDWishlistDiv">
                <div className="wishlistHeader">
                  <h3 className="wishlistHeader">Wishlist</h3>
                </div>
                {currentWishlist.map((item) => {
                  return (
                    <AccountDetailWishlistItems key={item.id} item={item} />
                  );
                })}
                <WishlistSubTotalComp localWishlist={currentWishlist} />
              </div>
              <div className="aDCartDiv">
                <div className="CurrentCart">
                  <h3 className="CurrentCart">Current Cart</h3>
                </div>
                <div className="scrollbarEraserDiv">
                  <div className="cartListItemsHOlderDiv">
                    {cart.map((item) => {
                      return (
                        <AccountDetailListItems
                          key={item.id}
                          item={item}
                          itemId={item.product_id}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="cartSubTotalDiv">
                  <CartSubTotal localCart={cart} />
                </div>
              </div>
              <PastPurchasesPreview />
            </div>
          </div>
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

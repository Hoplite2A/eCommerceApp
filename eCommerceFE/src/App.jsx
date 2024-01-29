/* eslint-disable react-refresh/only-export-components */
//! Imported Libraries --------------------------
// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Home from "./Components/MainPages/Home";
import RegisterForm from "./Components/MainPages/RegistrationForm";
import RegistrationBanner from "./Components/UniversalFeatures/RegistrationBanner";
import Login from "./Components/UniversalFeatures/Login";
import AccountDetails from "./Components/LoggedInFeatures/AccountDetails";

import AllItems from "./Components/MainPages/AllItems";
import IndividualItem from "./Components/MainPages/IndividualItemTiles";
import IndividualItemPage from "./Components/MainPages/IndividualItemPage";
import Cart from "./Components/UniversalFeatures/Cart/Cart";
import CartSubTotal from "./Components/UniversalFeatures/Cart/CartSubTotal";
// import Checkout from './Components/UniversalFeature/Checkout';
import Footer from "./Components/UniversalFeatures/Footer";
import ContactUs from "./Components/UniversalFeatures/ContactUs";
import CSRStatement from "./Components/MainPages/CSR";
import GreenInitiativeStatement from "./Components/MainPages/GreenInitiative";
import ReturnPolicy from "./Components/MainPages/ReturnPolicy";
import WarrantyPolicy from "./Components/MainPages/WarrantyPolicy";
import "./App.css";
import PastPurchasesPage from "./Components/LoggedInFeatures/PastPurchases/PastPurchasesPage";
import AdminFeaturesPage from "./Components/AdminFeatures/AdminFeaturesPage";
//! ---------------------------------------------

//! Universal Variables -------------------------
export const BASE_URL = "http://localhost:3000/api";
//*Final signal Cart for sending to localStorage & for use in Cart Rendering
import CartWishlistContextProvider from "./Contexts/CartWishlistContextProvider";
// import { token } from "./Components/UniversalFeatures/Login";
//! ---------------------------------------------

//! UPDATED Signal based JWT token to reduce prop drilling requirement.

export default function App() {
  // const notLoggedIn = () => {
  //   redirect('/');
  // }
  // useEffect(() => {
  //   if (!token.value) {
  //     notLoggedIn();
  //   }
  // }, [])

  return (
    <CartWishlistContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/registerBanner" element={<RegistrationBanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accountDetails" element={<AccountDetails />} />
        <Route path="/AdminFeatures" element={<AdminFeaturesPage />} />
        {/* <Route path='/orderHistory' element={<OrderHistory />} /> */}
        <Route path="/pastPurchases" element={<PastPurchasesPage />} />
        <Route path="/AllItems" element={<AllItems />} />
        <Route path="/IndividualItemTiles" element={<IndividualItem />} />
        <Route
          path="/IndividualItemPage/:id"
          element={<IndividualItemPage />}
        />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/CartSubTotal" element={<CartSubTotal />} />
        {/* <Route path="/Checkout" element={<Checkout  />} /> */}

        <Route path="/Footer" element={<Footer />} />
        {/* <Route path='/membershipInfo' element={<MembershipInfo />} /> */}
        {/* <Route path='/sellingInfo' element={<SellingInfo />} /> */}
        {/* <Route path='/giftCards' element={<GiftCard />} /> */}
        {/* <Route path='/reloadGiftCard' element={<Reload />} /> */}
        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/careers' element={<Careers />} /> */}
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/csrStatement" element={<CSRStatement />} />
        <Route
          path="/greenInitiativeStatement"
          element={<GreenInitiativeStatement />}
        />
        <Route path="/returns" element={<ReturnPolicy />} />
        <Route path="/warranty" element={<WarrantyPolicy />} />
      </Routes>
    </CartWishlistContextProvider>
  );
}

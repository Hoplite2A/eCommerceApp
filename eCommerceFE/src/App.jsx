/* eslint-disable react-refresh/only-export-components */
//! Imported Libraries --------------------------
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
// import Checkout from './Components/UniversalFeature/Checkout';

import Footer from "./Components/UniversalFeatures/Footer";
import ContactUs from './Components/UniversalFeatures/ContactUs';
import CSRStatement from "./Components/MainPages/CSR";
import GreenInitiativeStatement from "./Components/MainPages/GreenInitiative";
import ReturnPolicy from "./Components/MainPages/ReturnPolicy";
import WarrantyPolicy from "./Components/MainPages/WarrantyPolicy";
import "./App.css";
//! ---------------------------------------------

//! Universal Variables -------------------------
export const BASE_URL = 'http://localhost:3000/api'
//! ---------------------------------------------

//! UPDATED Signal based JWT token to reduce prop drilling requirement.

export default function App() {

  //*Added State variable to App.jsx for propdrilling of JWT Token
  // const [token, setToken] = useState(null)
  //*Route syntax for useState Prop Drilling of JWT Token
  // <Route path='' element={} token={token} setToken={setToken}/>
  
  //*Route template syntax utilizing SignalState for passing JWT Token to components:
  // <Route path='pathway' element={<Component />} />
  //*Import on each component where JWT is relevant as so (no need for props):
  // import {token} from '@preact/signals-react';
  
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/register' element={<RegisterForm />} />
      <Route path='/registerBanner' element={<RegistrationBanner />} />
      <Route path='/login' element={<Login />} />
      <Route path='/accountDetails' element={<AccountDetails />} />
      {/* <Route path='/orderHistory' element={<OrderHistory />} /> */}
      
      <Route path='/AllItems' element={<AllItems />} />
      <Route path='/IndividualItemTiles' element={<IndividualItem />} />
      <Route path="/IndividualItemPage/:id" element={<IndividualItemPage />} />
      <Route path="/Cart" element={<Cart  />} />
      {/* <Route path="/Checkout" element={<Checkout  />} /> */}

      <Route path='/Footer' element={<Footer />} />
      {/* <Route path='/membershipInfo' element={<MembershipInfo />} /> */}
      {/* <Route path='/sellingInfo' element={<SellingInfo />} /> */}
      {/* <Route path='/giftCards' element={<GiftCard />} /> */}
      {/* <Route path='/reloadGiftCard' element={<Reload />} /> */}
      {/* <Route path='/about' element={<About />} /> */}
      {/* <Route path='/careers' element={<Careers />} /> */}
      <Route path='/contactUs' element={<ContactUs />} />
      <Route path='/csrStatement' element={<CSRStatement />} />
      <Route path='/greenInitiativeStatement' element={<GreenInitiativeStatement />} />
      <Route path='/returns' element={<ReturnPolicy />} />
      <Route path='/warranty' element={<WarrantyPolicy />} />
      
    </Routes>
  );
}

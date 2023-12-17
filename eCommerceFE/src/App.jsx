/* eslint-disable react-refresh/only-export-components */
//! Imported Libraries --------------------------
import { Routes, Route } from "react-router-dom";
import { signal } from '@preact/signals-react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Home from "./Components/MainPages/Home";
import AccountDetails from "./Components/LoggedInFeatures/AccountDetails";

import "./App.css";
//! ---------------------------------------------

//! Universal Variables -------------------------
export const BASE_URL = 'https://www.makeupSite.com/'
//! ---------------------------------------------

//! UPDATED Signal based JWT token to reduce prop drilling requirement.
export const userDetails = signal([]);

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
      <Route path='/accountDetails' element={<AccountDetails />} />
      {/* <Route path='/about' element={<About />} /> */}
      {/* <Route path='/careers' element={<Careers />} /> */}
      {/* <Route path='/contactUs' element={<ContactUs />} /> */}
      {/* <Route path='/csrStatement' element={<CSR />} /> */}
      {/* <Route path='/greenInitiativeStatement' element={<Green />} /> */}
      {/* <Route path='/membershipInfo' element={<MembershipInfo />} /> */}
      {/* <Route path='/sellingInfo' element={<SellingInfo />} /> */}
      {/* <Route path='/giftCards' element={<GiftCard />} /> */}
      {/* <Route path='/reloadGiftCard' element={<Reload />} /> */}
      {/* <Route path='/orderHistory' element={<OrderHistory />} /> */}
      {/* <Route path='/returns' element={<Return />} /> */}
      {/* <Route path='/warranty' element={<Warranty />} /> */}
      {/* <Route path='/' element={< />} /> */}
    </Routes>
  );
}

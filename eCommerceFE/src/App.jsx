/* eslint-disable react-refresh/only-export-components */
//! Imported Libraries -------------------------
import { Routes, Route } from "react-router-dom";
import { signal } from "@preact/signals-react";
//! --------------------------------------------

//! Imported Components ------------------------
import Home from "./Components/MainPages/Home";
import AccountDetails from './Components/LoggedInFeatures/AccountDetails';
import "./App.css";
//! --------------------------------------------

//! UPDATED Signal based JWT token to reduce prop drilling requirement.
export const userDetails = signal([]);

export const token = signal(null);
console.log(token.value);

//*For Testing Purposes this is how to change a signal value:
token.value = "89789yiuhUJHIYIUY899879hiuhkjhoiyiuHKJGHKjg987897yhjk";

console.log(token.value); 
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
      <Route path='/AccountDetails' element={<AccountDetails />} />
    </Routes>
  );
}

//! Imported Libraries --------------------------
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../UniversalFeatures/Navigation/Header";
import RegistrationBanner from "../UniversalFeatures/RegistrationBanner";
// import SearchBar from "../UniversalFeatures/SearchFilters/SearchBar";
// import AllItems from "../MainPages/AllItems";
import Footer from "../UniversalFeatures/Footer";
//! ---------------------------------------------

export default function Home() {
  return (
    <div className="homeDiv">
      <Header />
      <RegistrationBanner />
      {/* <SearchBar /> */}
      {/* <AllItems /> */}
      <Footer />
    </div>
  );
}

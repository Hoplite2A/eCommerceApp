//! Imported Libraries -------------------------
//! --------------------------------------------

//! Imported Components ------------------------
import Logo from "../Logo";
import Navigation from "./Navigation";
// import SearchBar from '../SearchFilters/SearchBar';
//! --------------------------------------------
export default function Header() {

  //TODO ---- Evaluation where we want to redirect endUser when
  //TODO ---- clicking on siteName OR <Logo />
  
  return (
    <div className="Header">
      <div className="logo">
        <Logo />
      </div>
      <div className='searchBar'>
         {/* <SearchBar /> */}
      </div>
      <div className="navBar">
        <Navigation />
      </div>
    </div>
  );
}

//! Imported Libraries -------------------------
//! --------------------------------------------

//! Imported Components/Variables---------------
import Logo from "../Logo";
import Navigation from "./Navigation";
import SearchBar from '../SearchFilters/SearchBar';
//! --------------------------------------------

export default function Header() {
  //TODO ---- Evaluation where we want to redirect endUser when
  //TODO ---- clicking on siteName OR <Logo />

  return (
    <div className="header">
        <Logo />
        <SearchBar />
      <Navigation />
    </div>
  );
}

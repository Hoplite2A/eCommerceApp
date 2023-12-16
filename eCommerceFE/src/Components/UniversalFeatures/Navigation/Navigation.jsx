//! Imported Libraries -------------------------
import { Link } from "react-router-dom";
import { token } from '../../../App';
//! --------------------------------------------

//! Imported Components ------------------------
// None to add as this is a simple navigation component.
//! --------------------------------------------

export default function Navigation() {

    //*If we decide to do a menu button with a dropdown menu when clicked on. 
    // const [menu, setMenu] = useState(false);

    // const handleClick = () => {
    //     setMenu(true);
        
    //     if (token.value !== null && menu) {
    //         return (
    //             <div className="navDropDownMenu">
    //                 <Link to="/">Home</Link>
    //                 <Link to="/AddItem">Sell</Link>
    //                 <Link to="/AccountDetails">Profile</Link>
    //             </div>
    //         )
    //     }
    // }

  return (
    <div className="navBar">
      <Link to="/"><p className='navBarLabels'>Home</p></Link>
      {token.value !== null ? (<>
        <Link to="/addItem"><p className='navBarLabels'>Sell Items</p></Link>
        <Link to="/accountDetails"><p className='navBarLabels'>Account Details</p></Link>
      </>) : (
        <Link to="/login"><p className='navBarLabels'>Login</p></Link>
      )}
    </div>
  );
}

//! Imported Libraries --------------------------
import { useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { token } from "../UniversalFeatures/Login";
import { userDetails } from "../UniversalFeatures/Login";
//! ---------------------------------------------

export default function Logout() {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        token.value = null;
        userDetails.value = null;
        navigate('/');
    }

    return (<>
        <div className="logoutDiv">
            <p className="logoutButton" onClick={handleLogout}>Logout</p>
        </div>
    </>)
}
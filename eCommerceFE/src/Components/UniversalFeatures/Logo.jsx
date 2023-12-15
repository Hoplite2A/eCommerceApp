//! Imported Libraries -------------------------
import { Link } from 'react=router-dom';
//! --------------------------------------------

//! Imported Components ------------------------
// None to add as this is a simple logo component.
//! --------------------------------------------

export default function Logo() {
    
    return (<>
        <div className='body'>
            <Link to='/'>
                <div className="logo">
                    <div className="ring"></div>
                    <div className="coffee-cup"></div>
                </div>
            </Link>
        </div>    
    </>)
}
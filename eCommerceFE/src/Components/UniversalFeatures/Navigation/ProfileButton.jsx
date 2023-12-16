// //! Imported Libraries -------------------------
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// //! --------------------------------------------

// //! Imported Components ------------------------
// import { userDetails } from '../../../App';
// import { token } from '../../../App';
// //! --------------------------------------------

// export default function ProfileButton() {

//     const { firstName } = userDetails.value.firstName;

//     const [isHover, setIsHover] = useState(false);
    
//     return (<>
//         <div className="loggedInProfileButton">
//             <h4 className="userGreeting">Hello, {token.value !== null ?
//                 `${firstName}` : 'sign in'}
//             </h4>
//             <h3
//                 onMouseEnter={() => setIsHover(true)}
//                 onMouseLeave={() => setIsHover(false)}
//             >{isHover === false ? <Link to='/AccountDetials'>Account Details</Link> :
//                 token.value !== null ? 
                
//                 < Link to='/Login'>Login</Link>}
//             </h3>
//         </div>            
//     </>)
// }
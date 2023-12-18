//! Imported Libraries --------------------------
import { useState, useEffect } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import {token} from '../../Components/UniversalFeatures/Login';
import { BASE_URL } from '../../App';
//! ---------------------------------------------

export default function AccountDetails() {

    const [visible, setVisible] = useState(false);
    const [details, setDetails] = useState('');

    const { firstName, preferredName, lastName, street, phoneType, phoneNumber, emailAddress, user } = details;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`,
                },
                body: JSON.stringify({
                    //TODO -------------------------------- Add body values for patch API
                }),
            })
            const json = res.json();
            
            if (json.message === 'Profile has been updated Successfully') {
                //TODO -------------------------------- Update alert to acknowledgement
                alert(`${firstName}, your profile has been successfully updated.`)
            } else {
                console.log(`An error occurred when performing update, Error: ${err}.`);
            }
        } catch (err) {
        console.log(`An Error occurred within the handleSubmit function for the Profile Patch, ${err}.`);
        }
    }
    
    if (token) {
        setVisible(true);
    }

    useEffect(() => {
        async function fetchAccountDetails() {
            try {
                const res = await fetch(`${BASE_URL}accountDetails`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        //TODO -------------------------------- Add body values for GET API
                    }),
                })
                const json = await res.json();
                setDetails(json);
            } catch (err) {
                console.log(`An Error occurred within the fetchAccountDetails API Call, ${err}`);
            }
        }
        return () => fetchAccountDetails();
    },[])
    
    return (<>
        {visible && details ?
            <>
                <form className="accountDetails" onSubmit={handleSubmit}>
                    <div className="userAccountDetails">
                        {/* Profile Image */}
                        <h2 className="accountDetailsTitle">Hi, {firstName}</h2>
                    </div>
                    <div className="userNameDetails">
                        <label htmlFor="fistName">First Name:</label>
                            <input type="text" id='firstName' name='firstName' value={firstName} onChange={(e)=>setDetails(e.target.value)} />
                        <label htmlFor="preferredName">Nick Name:</label>
                            <input type="text" id='preferredName' name='preferredName' value={preferredName} onChange={(e)=>setDetails(e.target.value)} />
                        <label htmlFor="lastName">LastName:</label>
                            <input type="text" id='lastName' name='lastName' value={lastName} onChange={(e)=>setDetails(e.target.value)} />
                    </div>                       
                    

                </form>
            </> : 
            <>
            
            </>
        }
    </>)
}
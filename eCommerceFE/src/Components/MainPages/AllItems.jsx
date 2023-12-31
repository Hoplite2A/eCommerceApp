//! Imported Libraries -------------------------
import { useState } from 'react';
//! --------------------------------------------

//! Imported Components/Variables---------------
import { BASE_URL } from '../../App';
import IndividualItem from './IndividualItemTiles';
//! --------------------------------------------

export default function AllItems() {

    const [allItems, setAllItems] = useState({});
    const [error, setError] = useState(false);

    try {
        const res = fetch(`${BASE_URL}`);
        const json = res.json();
        setAllItems(json);
    } catch (err) {
        console.log(`Error occured in AllItems data Fetch, ${err}`)
        setError(true)
    }

    return (<>
        {!error ?
            <div className="allItemsDiv">
                {allItems.map((item) => {
                    <IndividualItem key={item.id} item={item} />
                    })} 
            </div> : 
            <div className="allItemsErrorMessage">
                <p className="errorMessage">
                    Our servers are on strike. We will work with them to get back to serving you. 
                </p>
            </div>
        }    
    </>)
}
//! Imported Libraries -------------------------
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
//! --------------------------------------------

//! Imported Components/Variables---------------
import { token } from "../UniversalFeatures/Login";
import { BASE_URL } from '../../App';
//! --------------------------------------------


export default function IndividualItemPage(id) {
    
    const [item, setItem] = useState({});

    useEffect(() => {
        async function IndividualItemPageFetch() {
            try {
                const res = await fetch(`${BASE_URL}/products/${id}`);
                const json = await res.json();
                console.log(json);
                setItem(json.allProducts);
            } catch (err) {
                console.log(`Error occurred in the IndividualItemPageFetch within the IndividualItemPage component, ${err}`);
                return (<>
                    <div className="allItemsErrorMessage">
                        <p className="errorMessage">
                            Aparently our servers needed a coffee break. Once they are re-cafinated, they will provide you the info you requested.
                        </p>
                    </div>
                </>)
            }
        }
        return () => IndividualItemPageFetch();
    }, [])

    return (<>
       <div className="individualItemPage">
            <div className="individualItemPageTop">
                    <div className="individualItemPageImage">
                        <img src={item.image} alt={item.title} />
                    </div>
            </div>
            <div className="individualItemPageBottom">
                <h3 className="individualTitle">{item.title}</h3>
                <p className="individualItemPagePrice price">{item.price}</p>
            </div>
            <div className="individualItemPageButton">
            {token.value ? <>
                        <button className="wishlistButton individualItemPageButton">Add to Wishlist</button>
                        <button className="cartButton individualItemPageButton">Add to Cart</button>
                    </> :
                    <>
                        <button className="cartButton individualItemPageButton">Add to Cart</button>
                    </>}
            </div>
        </div>
    </>)
}





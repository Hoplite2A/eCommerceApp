//! Imported Libraries -------------------------
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
//! --------------------------------------------

//! Imported Components/Variables---------------
import Header from '../UniversalFeatures/Navigation/Header';
import Footer from '../UniversalFeatures/Footer';
import { token } from "../UniversalFeatures/Login";
import { BASE_URL } from '../../App';
//! --------------------------------------------


export default function IndividualItemPage() {

    const navigate = useNavigate();
    const allItemsPage = () => {
        navigate('/');
    }

    //! To Test logged in versus visitor view enable 
    //! line titled Not-Visible and comment out Visible
    //*Not-Visible:
    // const visible = !token.value;
    //*Visible: 
    const visible = token.value;
    
    //Pulled param for use in useEffect API Call for individual Item Details
    const { id } = useParams();
    
    //Defined Object to destructure and use for function return fields from 
    //the useEffect API Call
    const [item, setItem] = useState({});
    
    useEffect(() => {
    async function IndividualItemPageFetch() {
        try {
            const res = await fetch(`${BASE_URL}/products/${id}`);
            const json = await res.json();
            console.log(json);
            setItem(json.singleProduct);
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
    }, [id])
    
    return (<>
        <Header />
        <div className="individualItemPage">
            <div className="individualItemPageLeft">
                    <div className="individualItemPageImage">
                        <img src={item.image} alt={item.title} />
                    </div>
            </div>
            <div className="individualItemPageRight">
                    <h3 className="individualItemPageTitle">{item.title}</h3>
                <div className="individualItemPageInfo">
                    <div className="individualItemPagePriceDiv">
                        <p className="individualItemPagePrice price">${item.price}</p>
                    </div>
                    <div className={visible ? "individualItemPageButtonLoggedIn" : "individualItemPageButtonVisiting"}>
                    {/* <div className="individualItemPageButtonVisiting individualItemPageButtonLoggedIn"> */}
                    {visible ? <>
                                <button className="wishlistButton individualItemPageButton">Add to Wishlist</button>
                                <button className="cartButton individualItemPageButton">Add to Cart</button>
                            </> :
                            <>
                                <button className="cartButton individualItemPageButton">Add to Cart</button>
                            </>}
                    </div>  
                </div>
            </div>
        </div>
            <p className="backMessage">Not digging this, check out other items</p>
            <button className="backToHome" onClick={allItemsPage}>OTHER ITEMS</button>
        <Footer />
    </>)
}





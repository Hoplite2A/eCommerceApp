//! Imported Libraries --------------------------
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import CartItemsList from './CartItemsList';
import CartSubTotal from './CartSubTotal';
import Header from '../Navigation/Header';
import Footer from '../Footer';
import { BASE_URL } from '../../../App';
// import { userDetails } from '../Login';
import { CartWishlistContext } from '../../../Contexts/CartWishlistContextProvider';
//! ---------------------------------------------

export default function Cart() {
    
    const { localCart } = useContext(CartWishlistContext);
    // const userInfo = userDetails.value;
    // const userId = userInfo.id;

    const navigate = useNavigate();
    const LSCart = JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
    }, [LSCart, localCart])

    const checkout = () => {
        async function CheckoutCart() {
            try {
                const res = await fetch(`${BASE_URL}/pastPurchases`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cart: localCart,
                    })
                });
                const json = res.json();
                const checkoutMessage = json.message;
                return checkoutMessage;
            } catch (err) {
                console.log(`Error Occurred in CheckoutCart Function within the Cart Component, ${err}`)
            }
        }
        return () => CheckoutCart();
    }

    return (<>
            <div className="cartPage">
                <Header />
                    <div className="cartPageDiv">
                        <div className="cartPageDivLeft">
                    {LSCart.map((cartListItem, index) => {
                        return <CartItemsList key={index} cartListItem={cartListItem} />
                    })}
                        </div>
                        <div className="cartPageDivRight">
                            <CartSubTotal localCart={LSCart} />
                            {LSCart ? <div className="cartbuttons">
                                    <button className="checkout" onClick={() => checkout()}>Checkout</button> 
                                </div> : <></>}
                        </div>
                    </div> 
                    <button className='continueShopping' onClick={() => navigate('/')}>Continue Shopping</button>
                <Footer />
            </div>
        </>)   
}
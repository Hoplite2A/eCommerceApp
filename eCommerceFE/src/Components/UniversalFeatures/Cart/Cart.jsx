//! Imported Libraries --------------------------
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import CartItemsList from './CartItemsList';
// import CartSubTotal from './CartSubTotal';
import { dbCart } from '../../../App';
import Header from '../Navigation/Header';
import Footer from '../Footer';
// import { BASE_URL } from '../../../App';
//! ---------------------------------------------

//*Redefining the dbCart Array to tempCart for ease of use in the Cart Component

export default function Cart() {
    
    const tempCart = dbCart.value;
    console.log('Cart Start');
    console.log(dbCart);
    console.log(tempCart);
    console.log('Cart End');
    
    //TODO -- Write function for watching for session launch (toggle signal to True)
    // const session = signal(false);
    
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/');
    }

    // const checkout = () => {
    //     async function CheckoutCart() {
    //         try {
    //             const res = await fetch(`${BASE_URL}/Checkout`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     //!ENTER IN REQUIRED VALUES -------------------------------
    //                 })
    //             });
    //             const json = res.json();
    //             const checkoutMessage = json.message;
    //             return checkoutMessage;
    //         } catch (err) {
    //             console.log(`Error Occurred in CheckoutCart Function within the Cart Component, ${err}`)
    //         }
    //     }
    //     return () => CheckoutCart();
    //     navigate('/CheckoutCartMessage');
    // }

    return (<>
            <Header />
                <div className="cartPageDiv">
                    <button className='continueShopping' onClick={redirect}>Continue Shopping</button>
                    {tempCart.map((cartListItem) => {
                        return <CartItemsList key={cartListItem.id} cartListItem={cartListItem} />
                    })}
                    {/* <CartSubTotal /> */}
                    <button className="checkout" >Checkout</button>
                </div> 
            <Footer />
        </>)   
}
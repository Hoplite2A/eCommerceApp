//! Imported Libraries --------------------------
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import CartSubTotal from './CartSubTotal';
import CartItemsList from './CartItemsList';
//! ---------------------------------------------

export default function Cart() {
    
    //*Pulling Cart from local Storage
    //! -------------------------------------------------------------------------ISSUE
    // const [tempCart, setTempCart] = useState();
    // useEffect(() => {
        //     const localCart = localStorage.getItem('cart');
        //     if (localCart) {
            //         const storedCart = JSON.parse(localCart);
            //         setTempCart(storedCart)
            //         console.log(`Local Storage Array ${tempCart}`);
            //     } else {
                //         localStorage.setItem('cart', JSON.stringify([]));
                //       }
                // }, [])
                
                // // //*Duplicate Object Count and setting quantity:
                // const [cartPlaceholder, setCartPlaceholder] = useState([]);
                // const [quantity, setQuantity] = useState(1);
                
                
    // //*Removing duplicates and placing quantity key:value pair in each of the corresponding objects
    // const [newCartItemList, setNewCartItemList] = useState([]);
    // *Testing with const [cartPlaceholder, setCartPlaceholder] = useState([]);
    // const reducedCart = tempCart.reduce((acc, curr) => {
        //     acc.includes(curr) ? acc : [...acc, curr];
        // })
        // console.log(`Original Cart: ${tempCart}.`)
        // console.log(`Reduced Cart" ${reducedCart}.`);
    //! -------------------------------------------------------------------------ISSUE
    
    
    //*To count the total number of items in the updated cart
    // const [cartCount, setCartCount] = useState(0);

    //*Redirect configured for sending user to checkout page and prop drill updated array
    // const navigate = useNavigate();
    // //TODO ------------------- Add prop to checkout function for newly created array for purchase
    // const checkout = () => {
    //     navigate('/');
    // }

    //*Creating redirect button to Checkout Page for cart purchase

    //*Creating visible state vairable to determine if this component is visible
    //* in the Header.
    // const [visible, setVisible] = useState(false);
    // // if (cartCount && cartList !== null) {
    // if (tempCart !== null) {
    //     setVisible(true);
    // }

    return (<>
            {/* {visible ? 
                <div className="cartPageDiv">
                    {tempCart.map((cartListItem) => {
                        <cartPlaceholder key={cartListItem.id} cartListItem={cartPlaceholder} />
                    })}
                <CartSubTotal />
                <button className="checkout" onClick={checkout}>Checkout</button>
                </div> :
                null
            } */}
        </>)   
}
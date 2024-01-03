//! Imported Libraries --------------------------
import { useSignal } from 'react';
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { cartCount } from '../../MainPages/IndividualItemTiles';
import { cartList } from '../../MainPages/AllItems';
import CartItemsList from './CartItemsList';
import CartSubTotal from './CartSubTotal';
//! ---------------------------------------------


export default function Cart() {

    //*Creating visible state vairable to determine if this component is visible
    //* in the Header.
    const [visible, setVisible] = useSignal(false);

    if (cartCount && cartList !== null) {
        setVisible(true);
    }

    return (<>
            {visible ? 
                <div className="cartPageDiv">
                    {cartList.map((cartItem) => {
                        <CartItemsList key={cartItem.id} cartItem={cartItem} />
                    })}
                <CartSubTotal />
                </div> :
                null
            }
        </>
    )   
}
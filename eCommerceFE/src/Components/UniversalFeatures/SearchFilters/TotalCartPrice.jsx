//! Imported Libraries -------------------------
//! --------------------------------------------

//! Imported Components/Variables---------------
import { cartPriceList } from '../Cart/Cart';
//! --------------------------------------------

export default function TotalCartPrice() {
    
    console.log(cartPriceList);

    return (<>
        <div className="totalCartPrice">
            cartPriceList
        </div>
    </>)
}
// Clicking on a past purchase takes you to the past purchases page
// Look at amazon

import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import Header from "../../UniversalFeatures/Navigation/Header";
import Footer from "../../UniversalFeatures/Footer";
import PastPurchasesTile from "./PastPurchasesTile";
import { token } from "../../UniversalFeatures/Login";
import { userDetails } from "../../UniversalFeatures/Login";
import { pastPurchases, initializePastPurchases } from "./PastPurchasesSignal";
//! ---------------------------------------------

export default function PastPurchasesPage() {
  async function initialize() {
    try {
      await initializePastPurchases();
      // const updatedPurchases = pastPurchases.value;
    } catch (error) {
      console.log(`Error during initialization: ${error}`);
    }
  }
  
  // const navigate = useNavigate();
  useEffect(() => {
    initialize();
    // if (!token.value) {
    //   navigate('/login');
    // }
  }, []);


  return (
    <>
      {token.value && userDetails.value ? (
        <>
          <Header />
          <div className="ppPageDiv">
            {pastPurchases.value ? (
              pastPurchases.value.map((purchase) => {
                return (
                  <PastPurchasesTile key={purchase.id} purchase={purchase} />
                );
              })
            ) : (
              <h3>You haven't made any purchases...yet</h3>
            )}
          </div>
          <Footer />
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
}

// // Clicking on a past purchase takes you to the past purchases page
// // Look at amazon

// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// //! ---------------------------------------------

// //! Imported Components/Variables----------------
// import Header from "../../UniversalFeatures/Navigation/Header";
// import Footer from "../../UniversalFeatures/Footer";
// import PastPurchasesTile from "./PastPurchasesTile";
// import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";

// import { token } from "../../UniversalFeatures/Login";
// import { userDetails } from "../../UniversalFeatures/Login";
// import { initializePastPurchases } from "./PastPurchasesSignal";
// //! ---------------------------------------------

// export default function PastPurchasesPage() {
//   const { pastPurchases, setPastPurchases } = useContext(CartWishlistContext);
//   console.log({ pastPurchases });
//   async function initialize() {
//     try {
//       await initializePastPurchases();
//       // const updatedPurchases = pastPurchases.value;
//     } catch (error) {
//       console.log(`Error during initialization: ${error}`);
//     }
//   }

//   useEffect(() => {
//     initialize();
//   }, []);
//   console.log(pastPurchases);

//   const navigate = useNavigate();

//   return (
//     <>
//       {token.value && userDetails.value ? (
//         <>
//           <Header />
//           <div className="ppPageDiv">
//             {pastPurchases.value ? (
//               pastPurchases.value.map((purchase) => {
//                 return (
//                   <PastPurchasesTile key={purchase.id} purchase={purchase} />
//                 );
//               })
//             ) : (
//               <h3>You haven't made any purchases...yet</h3>
//             )}
//           </div>
//           <Footer />
//         </>
//       ) : (
//         navigate("/")
//       )}
//     </>
//   );
// }

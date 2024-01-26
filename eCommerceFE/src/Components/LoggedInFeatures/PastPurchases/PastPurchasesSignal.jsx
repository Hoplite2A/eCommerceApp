//! Imported Libraries --------------------------
import { signal } from "@preact/signals-react";
import { useEffect } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { token } from "../../UniversalFeatures/Login";
import { BASE_URL } from "../../../App";
//! ---------------------------------------------

export const pastPurchases = signal([]);

export async function initializePastPurchases() {
  {
    try {
      const res = await fetch(`${BASE_URL}/pastPurchases`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const json = await res.json();
      console.log({ json });
      pastPurchases.value = json;
    } catch (error) {
      console.log(`Error occurred in PastPurchasesSignal: ${error}`);
    }
  }
  return pastPurchases;
}

// //! Imported Libraries --------------------------
// import { signal } from "@preact/signals-react";
// import { useContext, useEffect } from "react";
// //! ---------------------------------------------

// //! Imported Components/Variables----------------
// import { CartWishlistContext } from "../../../Contexts/CartWishlistContextProvider";
// import { token } from "../../UniversalFeatures/Login";
// import { BASE_URL } from "../../../App";
// //! ---------------------------------------------
// // Useeffect in here to update past purchases with context
// // Use context to pass in pastPurchases, setPastPurchases
// // export const pastPurchases = signal([]);

// export async function initializePastPurchases() {
//   const { pastPurchases, setPastPurchases } = useContext(CartWishlistContext);
//   async function fetchPastPurchases() {
//     if (!pastPurchases) {
//       try {
//         const res = await fetch(`${BASE_URL}/pastPurchases`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token.value}`,
//           },
//         });
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         const json = await res.json();
//         console.log({ json });
//         // pastPurchases.value = json;
//         setPastPurchases(json);
//       } catch (error) {
//         console.log(`Error occurred in PastPurchasesSignal: ${error}`);
//       }
//     }
//   }
//   fetchPastPurchases();
// }

// // if (!pastPurchases) {
// //   try {
// //     const res = await fetch(`${BASE_URL}/pastPurchases`, {
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token.value}`,
// //       },
// //     });
// //     if (!res.ok) {
// //       throw new Error(`HTTP error! Status: ${res.status}`);
// //     }
// //     const json = await res.json();
// //     console.log({ json });
// //     // pastPurchases.value = json;
// //     setPastPurchases(json);
// //   } catch (error) {
// //     console.log(`Error occurred in PastPurchasesSignal: ${error}`);
// //   }
// // }
// //   return pastPurchases;
// // }

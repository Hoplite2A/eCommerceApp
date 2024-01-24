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
  console.log({ pastPurchases });
  if (pastPurchases.value.length === 0) {
    try {
      console.log("Its fetching again in InitializePastPurchases");
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

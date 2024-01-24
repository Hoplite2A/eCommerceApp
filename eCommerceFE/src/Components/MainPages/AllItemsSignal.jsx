//! Imported Libraries --------------------------
import { signal } from "@preact/signals-react";
import { useEffect } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { token } from "../UniversalFeatures/Login";
import { BASE_URL } from "../../App";
//! ---------------------------------------------

export const allItems = signal([]);

export async function initializeAllItems() {
  console.log({ allItems });
  console.log(allItems.value.length);
  console.log("allitems after update: ", allItems.value);
  if (allItems.value.length === 0) {
    try {
      console.log("Its fetching again in InitializeAllItems");
      const res = await fetch(`${BASE_URL}/products`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const json = await res.json();
      console.log({ json });
      allItems.value = json;
    } catch (error) {
      console.log(`Error occurred in AllItemsSignal: ${error}`);
    }
  }
  return allItems;
}

// Account detaails page should show this on the right side, or with a button
// Show first item image, date and total
// If they click on that take us into past purchases
// Past purchases tiles of previews of last 4 along the bottom half
//! Imported Libraries --------------------------
import { useEffect } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { token } from "../../UniversalFeatures/Login";
import { userDetails } from "../../UniversalFeatures/Login";
import { pastPurchases, initializePastPurchases } from "./PastPurchasesSignal";
//! ---------------------------------------------

export default function PastPurchasesPreview() {
  async function initialize() {
    try {
      await initializePastPurchases();
      // const updatedPurchases = pastPurchases.value;
    } catch (error) {
      console.log(`Error during initialization: ${error}`);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <h2 className="pppTitle">Recent Purchases:</h2>
      <div className="pastPurchasePreviewDiv">
        {pastPurchases &&
          pastPurchases.value
            .slice(-4)
            .reverse()
            .map((item) => {
              const date = new Date(item.purchase_date).toLocaleDateString(
                undefined,
                options
              );
              return (
                <div key={item.id} className="pppIndividualTile">
                  <h3>Puchase made on {date}</h3>
                  <div className="pppImageDiv">
                    <img
                      className="pppImage"
                      src={item.items[0].image}
                      alt={item.items[0].title}
                    />
                  </div>
                  <p>{item.items[0].title}</p>
                  <p>Number of items: {item.items.length}</p>
                  <p>Total: {item.purchase_total}</p>
                </div>
              );
            })}
      </div>
    </>
  );
}

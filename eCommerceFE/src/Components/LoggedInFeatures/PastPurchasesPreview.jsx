// Account detaails page should show this on the right side, or with a button
// Show first item image, date and total
// If they click on that take us into past purchases
// Past purchases tiles of previews of last 4 along the bottom half
//! Imported Libraries --------------------------
import { useEffect, useState } from "react";
//! ---------------------------------------------

//! Imported Components/Variables----------------
import { token } from "../../Components/UniversalFeatures/Login";
import { userDetails } from "../../Components/UniversalFeatures/Login";
import { BASE_URL } from "../../App";
//! ---------------------------------------------

export default function PastPurchasesPreview() {
  const {
    first_name,
    preferred_name,
    last_name,
    address,
    apartment,
    city,
    state,
    zip,
    phone,
    email,
    username,
  } = userDetails.value;

  const [pastPurchases, setPastPurchases] = useState([]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/pastPurchases`, {
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        console.log(json);
        setPastPurchases(json);
      } catch (error) {
        console.log(
          `Error occurred in PastPurchasesPreview pastPurchases Fetch, ${error}`
        );
      }
    };
    fetchData();
  }, []);
  console.log({ pastPurchases });
  return (
    <>
      <h2 className="pppTitle">Recent Purchases:</h2>
      <div className="pastPurchasePreviewDiv">
        {pastPurchases
          .slice(-4)
          .reverse()
          .map((item) => {
            const date = new Date(item.purchase_date).toLocaleDateString(
              undefined,
              options
            );
            {
              /* console.log(date.getDate()); */
            }
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

import { userDetails } from "../../UniversalFeatures/Login";

export default function PastPurchasesTile({ purchase }) {
  const { items, purchase_date, purchase_total, quantity } = purchase;
  return (
    <div className="pastPurchaseTile">
      <div className="pastPurchaseTileInfo">
        <h4>Date Ordered: {purchase_date}</h4>
        <h4>Purchase Total: {purchase_total}</h4>
        <h4>
          Purchased By: {userDetails.value.first_name}{" "}
          {userDetails.value.last_name}
        </h4>
      </div>
      <div className="ppPageImageDiv">
        {items.map((item) => {
          return (
            <div className="pppImageContainer" key={item.product_id}>
              <div className="titleText">{item.title}</div>
              <img className="ppPageImage" src={item.image} alt={item.title} />
              <div className="quantityText">
                <p>Quantity Ordered: {item.quantity}</p>
                <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

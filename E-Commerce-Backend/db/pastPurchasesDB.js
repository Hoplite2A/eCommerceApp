// Create a table for each users past purchases
// id, user_id, but basically I'm just making this, to make a unique key, to pass into the past_purchases items database, which will then have to go through and retrive all that information based on that unique id anyway? Plust wont it still have to go through the same amount of objects in the database anyway? Only it will have to get data from another table to do it?
// For EACH past_purchase, create a row with unique id, the user_id, order total and date
// This will link the user to the specific purchase
// In past_purchases items
// "purchase_id" REFERENCES past_purchases, product_id, title, quantity, image, price, PRIMARY KEY(pruchase_id, product_id)
// Functions, ill only need a create past_purchase, get past_purchase, do we need an edit?
// For create:
// Create unique past_purchase row,

const client = require("./client");

async function createPastPurchase(userID, { cart }) {
  console.log(cart);
  try {
    let cartTotal = 0;
    for (const product of cart) {
      cartTotal += product.price * product.quantity;
      // console.log(product);
    }
    const {
      rows: [purchase],
    } = await client.query(
      `
      INSERT INTO past_purchases(user_id, purchase_total) VALUES ($1, $2)
      RETURNING *
      `,
      [userID, cartTotal]
    );
    const { id } = purchase;
    console.log({ purchase });
    let purchaseItems = [];
    for (const product of cart) {
      console.log({ product });
      console.log(product.available);
      if (product.available !== false) {
        const itemEntry = await createPastItems(id, product);
        purchaseItems.push(itemEntry);
      }
    }
    const purchaseInfo = { purchase, purchaseItems };
    console.log({ purchaseInfo });
    return purchaseInfo;
  } catch (error) {
    throw error;
  }
}

async function createPastItems(id, cartItem) {
  const { product_id, title, price, quantity, image } = cartItem;
  try {
    const {
      rows: [purchasedItem],
    } = await client.query(
      `
      INSERT INTO past_purchases_items(purchase_id, product_id, title, price, quantity, image) VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [id, product_id, title, price, quantity, image]
    );
    return purchasedItem;
  } catch (error) {
    throw error;
  }
}

async function getPastPurchases(userId) {
  console.log("Recived user:", userId);
  try {
    const result = await client.query(
      `
      SELECT 
        *
      FROM
        past_purchases pp
      JOIN
        past_purchases_items ppi ON pp.id = ppi.purchase_id
      WHERE pp.user_id=$1
      ORDER BY purchase_date DESC
      `,
      [userId]
    );
    console.log(result.rows);

    const organizedResults = {};

    result.rows.forEach((row) => {
      const {
        id,
        user_id,
        purchase_total,
        purchase_date,
        purchase_id,
        product_id,
        title,
        price,
        quantity,
        image,
      } = row;
      if (!organizedResults[purchase_id]) {
        organizedResults[purchase_id] = {
          id,
          user_id,
          purchase_total,
          purchase_date,
          items: [],
        };
      }

      organizedResults[purchase_id].items.push({
        product_id,
        title,
        price,
        quantity,
        image,
      });
    });

    // Sort by purchase date to ensure results are in DESCENDING order by date
    const resultArray = Object.values(organizedResults).sort(
      // Compares A to B, if result is negative, A goes in front of B, vice versa. If 0, stays same
      (a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)
    );

    return resultArray;
  } catch (error) {
    throw error;
  }
}

module.exports = { createPastPurchase, createPastItems, getPastPurchases };

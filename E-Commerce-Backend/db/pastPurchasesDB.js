const client = require("./client");

async function createPastPurchase(userID, { cart }) {
  try {
    let cartTotal = 0;
    for (const product of cart) {
      cartTotal += product.price * product.quantity;
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

    let purchaseItems = [];
    for (const product of cart) {
      if (product.available !== false) {
        const itemEntry = await createPastItems(id, product);
        purchaseItems.push(itemEntry);
      }
    }
    const purchaseInfo = { purchase, purchaseItems };
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

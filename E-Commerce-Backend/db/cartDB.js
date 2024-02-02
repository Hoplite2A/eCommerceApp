const client = require("./client");
const { getSingleProduct } = require("./productsDB");

async function getCart(userId) {
  try {
    const cartItems = await client.query(
      `
    SELECT *
    FROM carts
    WHERE user_id = $1;
    `,
      [userId]
    );
    if (!cartItems) return null;
    const items = cartItems.rows;
    return items;
  } catch (error) {
    throw error;
  }
}

async function addToCart(productId, userId, quantity) {
  const product = await getSingleProduct(productId);
  try {
    const { price, title, image } = product;
    const existingCartCheck = await client.query(
      `
      SELECT * FROM carts WHERE product_id=$1 and user_id=$2`,
      [productId, userId]
    );
    if (!existingCartCheck) {
      return;
    } else if (existingCartCheck.rows.length > 0) {
      const existingProductCount = existingCartCheck.rows[0].quantity;
      const {
        rows: [cartEntry],
      } = await client.query(
        `
          UPDATE carts SET quantity = $1 WHERE product_id=$2 AND user_id=$3 RETURNING *`,
        [existingProductCount + quantity, productId, userId]
      );
      return cartEntry;
    } else {
      const {
        rows: [cartEntry],
      } = await client.query(
        `
      INSERT INTO carts(product_id, user_Id, title, image, price, quantity) VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *
      `,
        [productId, userId, title, image, price, quantity]
      );
      return cartEntry;
    }
  } catch (error) {
    throw error;
  }
}

async function deleteUserCart(userId) {
  try {
    const {
      rows: [deletedCart],
    } = await client.query(
      `
      DELETE FROM carts
      WHERE user_id=$1
      RETURNING *;
      `,
      [userId]
    );
    return deletedCart;
  } catch (error) {
    throw error;
  }
}

module.exports = { addToCart, getCart, deleteUserCart };

// const totalCost = await client.query(
//   `SELECT
//     SUM(quantity * price) AS overall_total_cost
//   FROM
//     carts
//   WHERE
//     user_id=$1;
//     `,
//   [userId]
// );
// const total = totalCost.rows[0].overall_total_cost;

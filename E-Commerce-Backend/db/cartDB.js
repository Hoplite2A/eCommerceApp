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
      console.log("No Product found");
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

// Edit cart
// Patch1 Compare and edit:
// Get users current cart
// If it exists in users cart and update cart, update quantity,
// If it exists in users cart and not in update quantity, remove from cart
// else add to cart
// Patch2 Add:
// Requires only cart items that were increased or added
// Get users current cart
// If it exists, increase quantity by new quantity(or just update quantity to new quantity)
// Else add to cart
// Patch3 Remove:
// Get user cart
//  If it exists in users cart, delete item(or decrease quantity)

async function deleteUserCart(userId) {
  try {
    const deletedCart = await client.query(
      `
      DELETE FROM carts
      WHERE user_id=$1
      RETURNING *;
      `,
      [userId]
    );
    console.log(deletedCart.rows);
    return deletedCart.rows;
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

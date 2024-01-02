// Create addToCart(productId, userId)
// Update quantity in cart with userId and productId
// DO we need price?
//
// Get cart will have to retun all items with userId === userId

// await client.query(`
//     CREATE TABLE cart(
//       "user_id" INTEGER REFERENCES users(id),
//       "product_id" INTEGER REFERENCES product(id),
//       price MONEY NOT NULL,
//       quantity INTEGER NOT NULL,
//       PRIMARY KEY (user_id, product_id)
//     );
//     `);

const client = require("./client");
const { getSingleProduct } = require("./productsDB");

async function getCart(userId) {
  try {
    const cartItems = await client.query(
      `
    SELECT product_id, price, quantity
    FROM carts
    WHERE user_id = $1;
    `,
      [userId]
    );
    if (!cartItems) return null;
    const items = cartItems.rows;
    const totalCost = await client.query(
      `SELECT
        SUM(quantity * price) AS overall_total_cost
      FROM
        carts
      WHERE
        user_id=$1;
        `,
      [userId]
    );
    const total = totalCost.rows[0].overall_total_cost;
    return [{ items }, { total }];
  } catch (error) {
    throw error;
  }
}

async function addToCart(productId, userId, quantity) {
  console.log("WE MADE IT TO ADD TO CART");
  console.log(productId);
  console.log(userId);
  console.log(quantity);

  const product = await getSingleProduct(productId);
  console.log({ product });
  if (product) {
    const { price } = product;
    try {
      const {
        rows: [cartEntry],
      } = await client.query(
        `
      INSERT INTO carts(product_id, user_Id, price, quantity) VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *
      `,
        [productId, userId, price, quantity]
      );
      return cartEntry;
    } catch (error) {
      throw error;
    }
  } else {
    console.log("No Product found");
    return;
  }
}

module.exports = { addToCart, getCart };

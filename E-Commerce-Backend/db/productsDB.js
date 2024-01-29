//! Imported Libraries --------------------------
//! Imported Libraries --------------------------
const { nextTick } = require("process");
const client = require("./client");
// const { requireUser } = require('/utils');
//! ---------------------------------------------

//! Imported Components/Variables----------------
//! ---------------------------------------------

// //* -----------------GET ALL Db-----------------
async function getAllProducts() {
  console.log("IN GET ALL PRODUCTS");
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM products
    `);
    return rows;
  } catch (err) {
    console.log(`Error occurred in the getAllProcucts API Call, ${err}`);
    throw err;
  }
}
//* -----------------GET ALL Db-----------------

//* ----------------GET SINGLE Db---------------
async function getSingleProduct(id) {
  console.log("IN GET SINGLE PRODUCT...");
  console.log({ id });
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE id = $1
    `,
      [id]
    );
    return product;
  } catch (err) {
    console.log(`Error occurred in the getSingleProduct Db Call, ${err}`);
    throw err;
  }
}
//* ----------------GET SINGLE Db---------------

//* --------------CREATE PRODUCT Db-------------
async function createProduct({
  title,
  price,
  description,
  category,
  image,
  sellerId,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(title, price, description, category, image, sellerid)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
      `,
      [title, price, description, category, image, sellerId]
    );
    return product;
  } catch (err) {
    console.log(`Error occurred in the createProduct Db Call, ${err}`);
    throw err;
  }
}
//* --------------CREATE PRODUCT Db-------------

//* -------------VERIFY !DUPLICATE--------------
async function verifyProduct(title, description, category, sellerId) {
  try {
    const {
      rows: [newProduct],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE title=${title} AND
      description=${description} AND
      category=${category} AND
      sellerId=${sellerId};
    `,
      [newProduct]
    );
    if (!newProduct) {
      return null;
    }
  } catch (err) {
    console.log(`An error has ocurred in verifyProduct() (db), ${err}`);
    throw err;
  }
}

async function getProductByTitle(title) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE title=$1;
      `,
      [title]
    );
    console.log("Product:");
    console.log(product);
    return product;
  } catch (error) {
    console.log("An error has occured inside getProductByTitle()");
    throw error;
  }
}
//* -------------VERIFY !DUPLICATE--------------

//* --------------UPDATE PRODUCT Db-------------
// Update product availability
async function updateProductAvailability(id, availability) {
  console.log("UPDATE PRODUCT AVAILABILITY");
  try {
    await client.query(
      `
      UPDATE products
      SET available = $1
      WHERE id = $2;
      `,
      [availability, id]
    );
  } catch (error) {
    console.log(`Error updating product availability: ${error}`);
    throw error;
  }
}

// Update product values
async function updateProduct(id, fields = {}) {
  console.log("IN UPDATE PRODUCT");
  console.log({ fields });
  const excludedColumns = ["description", "category"];

  try {
    const cartColumns = await getColumnNames("carts");
    const wishlistColumns = await getColumnNames("wishlists");

    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length === 0) {
      console.log(`setString is empty, nothing to update.`);
      throw err;
    }
    await client.query("BEGIN");

    // Update product and return update product
    const {
      rows: [updatedProduct],
    } = await client.query(
      `
    UPDATE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
      `,
      Object.values(fields)
    );

    const setStringCarts = generateSetString(fields, cartColumns);
    const setValueCarts = generateValueString(fields, cartColumns);
    await client.query(
      `
    UPDATE carts
    SET ${setStringCarts}
    WHERE product_id=${id};
      `,
      Object.values(setValueCarts)
    );

    const setStringWishlists = generateSetString(fields, wishlistColumns);
    const setValueWishlists = generateValueString(fields, wishlistColumns);

    await client.query(
      `
    UPDATE wishlists
    SET ${setStringWishlists}
    WHERE product_id=${id};
      `,
      Object.values(setValueWishlists)
    );

    await client.query("COMMIT");

    return updatedProduct;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(
      `Error ocurred in updateProduct Db Call, ${err} for item: ${id}`
    );
    throw err;
  }
}

// Select Column Names Contained In Table
async function getColumnNames(tableName) {
  const result = await client.query(
    `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name=$1;
    `,
    [tableName]
  );
  return result.rows.map((row) => row.column_name);
}

// Filter Out Columns Not Contained In Table
function generateSetString(fields, columns) {
  return Object.keys(fields)
    .filter((key) => columns.includes(key))
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
}

// Return array of update values
function generateValueString(fields, columns) {
  let valueString = [];
  for (const [key, value] of Object.entries(fields)) {
    if (columns.includes(key)) {
      valueString.push(value);
    }
  }
  return valueString;
}
//* --------------UPDATE PRODUCT Db-------------

//* --------------DELETE PRODUCT Db-------------
async function deleteProduct(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
      `,
      [productId]
    );

    return product;
  } catch (err) {
    console.log(
      `Error ocurred in deleteProduct Db, ${err} for item: ${productId}`
    );
    throw err;
  }
}

//* --------------DELETE PRODUCT Db-------------

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  verifyProduct,
  updateProduct,
  updateProductAvailability,
  deleteProduct,
  getProductByTitle,
};

// await client.query("BEGIN");

// // update carts table to show unavailable
// await client.query(
//   `
//   UPDATE carts
//   SET product_id = -$1,
//   title = 'We''re sorry, but ' || $2 || ' is no longer available',
//   image = 'https://images.squarespace-cdn.com/content/v1/56db9f01c6fc08b9910d053a/1595609119785-0NP8XIMCG8RWCWPC49UC/south+park+bp+2.jpg?format=2500w'
//   WHERE product_id=$1;
//   `,
//   [productId, productName]
// );

// // update wishlist
// await client.query(
//   `
//   UPDATE wishlists
//   SET product_id = -$1,
//   title = 'We''re sorry, but ' || $2 || ' is no longer available',
//   image = 'https://images.squarespace-cdn.com/content/v1/56db9f01c6fc08b9910d053a/1595609119785-0NP8XIMCG8RWCWPC49UC/south+park+bp+2.jpg?format=2500w'
//   WHERE product_id=$1;
//   `,
//   [productId, productName]
// );

// await client.query(
//   `
//   DELETE FROM products
//   WHERE id=$1
//   RETURNING *;
//   `,
//   [productId]
// );

// await client.query("COMMIT");

// await client.query("ROLLBACK");

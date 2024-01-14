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
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM products;
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
//
async function updateProduct(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    console.log(`setString is empty, nothing to update.`);
    throw err;
  }

  try {
    // Use of "transaction" to ensure changes to a product are reflected in carts and wishlists
    // Transactions begin with a "BEGIN" in postgresSQL
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
    // Next update carts
    await client.query(
      `
    UPDATE carts
    SET ${setString}
    WHERE product_id=${id};
      `,
      Object.values(fields)
    );

    // Update wishlists now too
    await client.query(
      `
    UPDATE wishlists
    SET ${setString}
    WHERE product_id=${id};
      `,
      Object.values(fields)
    );
    // IF all went well, commit all changes to databse
    // This only happens if ALL CHANGES are made successfully
    await client.query("COMMIT");
    return updatedProduct;
  } catch (err) {
    // IF any changes fail, ROLLBACK returns all items to their original state
    await client.query("ROLLBACK");
    console.log(
      `Error ocurred in updateProduct Db Call, ${err} for item: ${id}`
    );
    throw err;
  }
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
      WHERE id=$1
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
  deleteProduct,
  getProductByTitle,
};

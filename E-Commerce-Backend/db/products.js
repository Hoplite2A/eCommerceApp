// //! Imported Libraries --------------------------
const client = require("./client");
// // const { requireUser } = require('/utils');
// //! ---------------------------------------------

// //! Imported Components/Variables----------------
// const {
//   token,
// } = require("../../eCommerceFE/src/Components/UniversalFeatures/Login");
// // import token from "../../eCommerceFE/src/Components/UniversalFeatures/Login";
// //! ---------------------------------------------

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
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM prodcuts
    WHERE id=${id};
    `);
    return rows;
  } catch (err) {
    console.log(`Error occurred in the getSingleProduct Db Call, ${err}`);
    throw err;
  }
}
//* ----------------GET SINGLE Db---------------

// //! ---------GET BY FILTER PRODUCTS Db----------
// //! ----- Not sure we should do this rather perform a getAllProducts
// //! ----- and filter on the front end only.
// //! ---------GET BY FILTER PRODUCTS Db----------

// //* --------------CREATE PRODUCT Db-------------
async function createProduct({
  title,
  price,
  description,
  category,
  image,
  sellerId,
}) {
  if (!req.user.admin) {
    throw {
      name: "Member Feature",
      message: "Must be a member to add new items to our catalog.",
    };
  }

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
  } catch (err) {
    console.log(`An error has ocurred in verifyProduct() (db), ${err}`);
    throw err;
  }
}
//* -------------VERIFY !DUPLICATE--------------

//* --------------UPDATE PRODUCT Db-------------
//
async function updateProduct(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${keys}"=$${index + 1}`)
    .join(".");

  if (setString.length === 0) {
    console.log(`setString is empty, nothing to update.`);
    throw err;
  }

  try {
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
    return updatedProduct;
  } catch (err) {
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
      rows: [deletedProduct],
    } = await client.query(
      `
      DELETE * FROM products
      WHERE id=${id};
      `,
      [deletedProduct]
    );
  } catch (err) {
    console.log(`Error ocurred in deleteProduct Db, ${err} for item: ${id}`);
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
};

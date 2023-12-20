const client = require("./client");
// const util = require("./util")

//* -----------------GET ALL API-----------------
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
//* -----------------GET ALL API-----------------

//* ----------------GET SINGLE API---------------
async function getSingleProduct() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM prodcuts
    WHERE id=${id};
    `);
    return rows;
  } catch (err) {
    console.log(`Error occurred in the getSingleProduct API Call, ${err}`);
    throw err;
  }
}
//* ----------------GET SINGLE API---------------

//TODO ---------GET BY FILTER PRODUCTS API----------
// async function filterProducts({ id, name, price, description, category }) {
//   try {
//     const { rows: [products] } = await client.query(`

//     `)
//   }
// }

//TODO ---------GET BY FILTER PRODUCTS API----------

//* --------------CREATE PRODUCT API-------------
async function createProduct({ name, price, description, category, image }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(title, price, description, category, image) VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (name) DO NOTHING 
      RETURNING *;
      `,
      [name, price, description, category, image]
    );
    return product;
  } catch (err) {
    console.log(`Error occurred in the createProduct API Call, ${err}`);
    throw err;
  }
}
//* --------------CREATE PRODUCT API-------------

//* --------------UPDATE PRODUCT API-------------
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
    UPDAE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return updatedProduct;
  } catch (err) {
    console.log(
      `Error ocurred in updateProduct API Call, ${err} for item: ${id}`
    );
    throw err;
  }
}

//* --------------UPDATE PRODUCT API-------------

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
};

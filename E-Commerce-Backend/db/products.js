const client = require("./client");
// const util = require("./util")

async function createProduct({ name, category, description, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, category, description, price) VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING 
      RETURNING *
    `,
      [name, category, description, price]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const {rows} = await client.query(`
    SELECT *
    FROM products;
    `);
    return rows
  }
}


module.exports = {
  createProduct,
  getAllProducts
};

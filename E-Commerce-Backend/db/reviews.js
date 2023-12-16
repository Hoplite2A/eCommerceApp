const client = require("./client");
// const util = require("./util")

async function createReview({ creatorId, productId, title, comment }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      INSERT INTO reviews ("creatorId", "productId", title, comment) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `,
      [creatorId, productId, title, comment]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReview,
};

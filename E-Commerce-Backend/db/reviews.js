const client = require("./client");
// const util = require("./util")

async function createInitialReviews() {
  try {
    console.log("starting to create reviews");

    const reviewsToCreate = [
      {
        creatorId: 1,
        productId: 1,
        title: "I love cats",
        comment: "Cats are amazing and I highly recommend them! 5 stars!",
      },
      {
        creatorId: 2,
        productId: 4,
        title: "I love kirby",
        comment:
          "Getting to suck stuff up as Kirby is so fun! I just can't get enough sucking!!!",
      },
      {
        creatorId: 3,
        productId: 5,
        title: "I love PS5",
        comment: "This is so great and a huge upgrade from my sega saturn.",
      },
    ];
    const reviews = await Promise.all(
      reviewsToCreate.map((review) => createReview(review))
    );
    console.log("Comments Created", reviews);
    console.log("Finished creating reviews");
  } catch (error) {
    throw error;
  }
}

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

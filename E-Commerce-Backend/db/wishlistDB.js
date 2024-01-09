const client = require("./client");
const { getSingleProduct } = require("./productsDB");

async function getUserWishlist(userId) {
  try {
    const wishlist = await client.query(
      `
      SELECT * FROM wishlists WHERE user_id=$1
      `,
      [userId]
    );

    if (!wishlist.rows.length) {
      throw {
        name: "UserWishlistDoesNotExist",
        message: `User #${userId} hasn't added anything to their wishlist yet`,
      };
    }
    return wishlist.rows;
  } catch (error) {
    throw error;
  }
}

async function addToWishlist(productId, userId) {
  const product = await getSingleProduct(productId);
  try {
    const { price, title, image } = product;
    const existingWishlistCheck = await client.query(
      `
      SELECT * FROM wishlists WHERE product_id=$1 and user_id=$2`,
      [productId, userId]
    );
    const existingProduct = existingWishlistCheck.rows;
    if (existingProduct.length > 0) {
      throw {
        name: "ItemAlreadyExists",
        message: `Item #${productId} already exists in user ${userId}'s wishlist`,
      };
    } else {
      const {
        rows: [wishlistEntry],
      } = await client.query(
        `
      INSERT INTO wishlists(product_id, user_Id, title, image, price) VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (product_id, user_id) DO NOTHING
      RETURNING *
      `,
        [productId, userId, title, image, price]
      );
      return wishlistEntry;
    }
  } catch (error) {
    throw error;
  }
}

async function deleteUserWishlist(userId) {
  try {
    const deletedWishlist = await client.query(
      `
      DELETE FROM wishlists
      WHERE user_id=$1
      RETURNING *;
      `,
      [userId]
    );
    return deletedWishlist.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserWishlist, addToWishlist, deleteUserWishlist };

// } else if (existingWishlistCheck.rows.length > 0) {
//   const existingProductCount = existingWishlistCheck.rows[0].quantity;
//   const {
//     rows: [wishlistEntry],
//   } = await client.query(
//     `
//       UPDATE wishlists SET quantity = $1 WHERE product_id=$2 AND user_id=$3 RETURNING *`,
//     [existingProductCount + quantity, productId, userId]
//   );
//   return wishlistEntry;

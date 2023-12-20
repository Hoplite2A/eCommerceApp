require("dotenv").config();
const express = require("express");
const wishlistsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const {
  getUserWishlist,
  addToWishlist,
  deleteUserWishlist,
} = require("../db/wishlistDB");

// TODO Delete single item?
// Get user wishlist by userId
wishlistsRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const wishlist = await getUserWishlist(req.user.id);
    res.send(wishlist);
  } catch (error) {
    next(error);
  }
});

// Add item to wishlist
wishlistsRouter.post("/", requireUser, async (req, res, next) => {
  const { productId } = req.body;
  try {
    const addedItem = await addToWishlist(productId, req.user.id);
    res.send(addedItem);
  } catch (error) {
    next(error);
  }
});

// Deletes entire users wishlist by userId
wishlistsRouter.delete("/", requireUser, async (req, res, next) => {
  // Try/Catch to await deleteUserCart
  try {
    const deletedWishlist = await deleteUserWishlist(req.user.id);
    res.send({ success: true, deletedItems: deletedWishlist });
  } catch (error) {
    next(error);
  }
});

module.exports = wishlistsRouter;

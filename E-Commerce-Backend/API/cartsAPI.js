require("dotenv").config();
const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const { getCart, addToCart, deleteUserCart } = require("../db/cartDB");

// Get user cart by userId
cartsRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const cart = await getCart(req.user.id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

// Add item to cart
cartsRouter.post("/", requireUser, async (req, res, next) => {
  const { productId } = req.body;
  let { quantity } = req.body;
  const userId = req.user.id;
  try {
    // const cart = await getCart(userId);
    const addedItem = await addToCart(productId, userId, quantity);
    res.send(addedItem);
  } catch (error) {
    next(error);
  }
});

// Deletes entire users cart by userId
cartsRouter.delete("/", requireUser, async (req, res, next) => {
  // Try/Catch to await deleteUserCart
  try {
    const deletedCart = await deleteUserCart(req.user.id);
    res.send({ success: true, deletedItems: deletedCart });
  } catch (error) {
    next(error);
  }
});

module.exports = cartsRouter;

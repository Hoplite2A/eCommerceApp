require("dotenv").config();
const express = require("express");
const cartsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const { getCart, addToCart } = require("../db/cartDB");

cartsRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const cart = await getCart(req.user.id);
    // const cart = [{ cartItems }, { total }];
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

cartsRouter.post("/", requireUser, async (req, res, next) => {
  const { productId } = req.body;
  let { quantity } = req.body;
  const userId = req.user.id;
  try {
    const cart = await getCart(userId);
    console.log({ cart });
    console.log(cart[0].items);
    const itemCheck = await Promise.all(
      cart[0].items.map(async (item) => {
        console.log(item.product_id);
        if (item.product_id === productId) {
          quantity = item.quantity + quantity;
          const addedItem = await addToCart(productId, userId, quantity);
          res.send(addedItem);
        }
      })
    );
    const addedItem = await addToCart(productId, userId, quantity);
    res.send(addedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = cartsRouter;

require("dotenv").config();
const express = require("express");
const pastPurchasesRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;
const { requireUser, requireAdmin } = require("./utils");
const {
  createPastPurchase,
  createPastItems,
  getPastPurchases,
} = require("../db/pastPurchasesDB");

// Get all past purchases by user
// http://localhost:3000/api/pastPurchases/
pastPurchasesRouter.get("/", requireUser, async (req, res, next) => {
  try {
    const pastPurchases = await getPastPurchases(req.user.id);
    res.send(pastPurchases);
  } catch (error) {
    next(error);
  }
});

// Get individual past purchase by purchase Id
// http://localhost:3000/api/pastPurchases/:purchaseId
pastPurchasesRouter.get("/:purchaseId", requireUser, async (req, res, next) => {
  const { purchaseId } = req.params;
  try {
    const pastPurchases = await getPastPurchases(req.user.id);
    const purchaseInfo = pastPurchases.filter(
      (purchase) => purchase.id === Number(purchaseId)
    );
    if (purchaseInfo.length < 1) {
      console.log("No purchase found");
      res.send(
        "The past purchase you are looking for does not exist or does not belong to you."
      );
      return;
    }
    res.send(purchaseInfo);
  } catch (error) {
    next(error);
  }
});

// Add past purchase
// http://localhost:3000/api/pastPurchases
pastPurchasesRouter.post("/", requireUser, async (req, res, next) => {
  const cart = req.body;
  try {
    const pastPurchases = await createPastPurchase(req.user.id, cart);
    res.send(pastPurchases);
  } catch (error) {
    next(error);
  }
});

module.exports = pastPurchasesRouter;

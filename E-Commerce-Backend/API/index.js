const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const { getUserById, getUserByUsername } = require("../db/usersDB");
const client = require("../db/client");
const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;

// Set req.user if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;

      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: "AuthorizationHeaderError",
          message: "Authorization token malformed",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

// Will add these once I have the APIs written
const usersRouter = require("./usersAPI");
apiRouter.use("/users", usersRouter);

const productsRouter = require("./productsAPI");
apiRouter.use("/products", productsRouter);

const cartsRouter = require("./cartsAPI");
apiRouter.use("/cart", cartsRouter);

// const reviewsRouter = require("./reviews");
// apiRouter.use("/reviews", reviewsRouter);

apiRouter.use((error, req, res, next) => {
  console.log(req.header);
  console.log(error);
  res.send(error);
});

module.exports = apiRouter;

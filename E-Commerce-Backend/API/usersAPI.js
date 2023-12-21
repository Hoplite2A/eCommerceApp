const express = require("express");
const usersRouter = express.Router();

const { createUser, getUserByUsername, getAllUsers } = require("../db/users");

// Get /api/users
usersRouter.get("/users", async (req, res, next) => {
  console.log("We here in get users API");
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordLengthError",
        message: "A user by that username already exists",
      });
    } else {
      const user = await createUser({
        username,
        password,
      });
      if (!user) {
        next({
          name: "UserCreationError",
          message: "There was a problem registering you. Please try again",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.send({ user, message: "You're signed up!", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

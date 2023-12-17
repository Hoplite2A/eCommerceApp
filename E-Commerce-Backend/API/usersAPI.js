require("dotenv").config();
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser } = require("./utils");
const {
  createUser,
  getUserByUsername,
  getAllUsers,
  getUser,
  getUserById,
  updateUser,
} = require("../db/users");

// Get /api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const {
      username,
      password,
      fName,
      lName,
      pName,
      streetAddress,
      apt,
      city,
      state,
      zip,
      phone,
      email,
    } = req.body;
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
        fName,
        lName,
        pName,
        streetAddress,
        apt,
        city,
        state,
        zip,
        phone,
        email,
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

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, message: "you're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  console.log("userId");
  console.log(userId);
  const { username, password, name } = req.body;
  console.log("req.body");
  console.log([req.body]);
  const body = Object.entries(req.body);

  const updateFields = {};

  body.forEach((element) => {
    console.log(typeof element[0]);
    const fieldName = element[0];
    console.log(fieldName);
    updateFields.fieldName = element[1];
    console.log(updateFields);
  });

  // if (name) {
  //   updateFields.name = name;
  // }

  // if (password) {
  //   updateFields.name = name;
  // }

  // if (username) {
  //   updateFields.name = name;
  // }

  // try {
  //   const originalUser = await getUserById(userId);
  //   if (originalUser.user.id === req.user.id) {
  //     const updatedUser = await updateUser(userId, updateFields);
  //     res.send({ user: updatedUser });
  //   } else {
  //     next({
  //       name: "UnauthorizedUserError",
  //       message: "You cannot update another user.",
  //     });
  //   }
  // } catch ({ name, message }) {
  //   next({ name, message });
  // }
  res.send(updateFields);
  // res.send("PATCH EDIT USER END");
});

module.exports = usersRouter;

require("dotenv").config();
const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;
const { requireUser } = require("./utils");
const {
  createUser,
  getUserByUsername,
  getAllUsers,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../db/users");
const e = require("express");

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
    admin,
  } = req.body;
  try {
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
        message: "Password must be at least 8 characters",
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
        admin,
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
  try {
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
    }

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

// update user
// Admin can edit all users
// Logged in users can edit only their own information
// Should add password confirmation to change password?
// Only admin can give other user admin
usersRouter.patch("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const updateData = req.body;
  const userToEdit = await getUserById(userId);
  if (!userToEdit) {
    next({
      name: "NotFound",
      message: "The user you are trying to edit does not exist.",
    });
  }

  try {
    if (userId == req.user.id || req.user.admin) {
      const updateFields = {};
      for (const key in updateData) {
        if (key === "admin" && !req.user.admin) {
          next({
            name: "UnauthorizedUserError",
            message: "Only an admin can grant other users admin privileges",
          });
        }
        if (updateData.hasOwnProperty(key)) {
          if (req.user.hasOwnProperty(key)) {
            updateFields[key] = updateData[key];
          }
        }
      }
      const updatedUser = await updateUser(userId, updateFields);
      res.send({ user: updatedUser });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a post that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Delete user
// Can delete your own account,
// TODO: should have to enter password to confirm?
// Admin can delete accounts
usersRouter.delete("/:userId", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userToDelete = await getUserById(userId);
    if (!userToDelete) {
      next({
        name: "NotFound",
        message: "The user you are trying to find does not exist.",
      });
    } else if (req.user.id !== parseInt(userId) && !req.user.admin) {
      next({
        name: "WrongUserError",
        message: "Only an admin can delete another user's profile",
      });
    } else {
      const deletedUser = await deleteUser(userId);
      res.send({ success: true, ...deletedUser });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

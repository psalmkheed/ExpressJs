const express = require("express");

const userController = require("../controllers/userController");

const authenticate = require("../auth/protectedRoute");

const router = express.Router();

// create user account
router.post("/create-user", userController.createUser);

// login user
router.post("/login", userController.loginUser);

// get all users
router.get("/get-users", authenticate, userController.getUsers);

// get a single user
router.get("/user/:id", authenticate, userController.getUser);

// update user
router.patch("/update-user/:id", authenticate, userController.updateUser);

// delete user
router.delete("/delete-user/:id", authenticate, userController.deleteUser);

module.exports = router;
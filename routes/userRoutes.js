const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

// create user account
router.post("/create-user", userController.createUser);

// get all users
router.get("/get-users", userController.getUsers);

// get a single user
router.get("/user/:id", userController.getUser);

// update user
router.patch("/update-user/:id", userController.updateUser);

// delete user
router.delete("/delete-user/:id", userController.deleteUser);

module.exports = router;
const User = require("../models/userModel");

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");

class UserController {

      // create user profile
      async createUser(req, res) {
            try {
                  const { name, email, password } = req.body;

                  const hashedPassword = await bcrypt.hash(password, 12)

                  const changeEmailCase = email.toLowerCase();

                  const user = await User.create({
                        name,
                        email: changeEmailCase,
                        password: hashedPassword
                  });

                  return res.status(201).json({
                        message: "User created successfully",
                        status: "success",
                        data: user
                  });

            } catch (error) {
                  if (error.code === 11000 && error.keyPattern?.email) {

                        return res.status(409).json({
                              status: "error",
                              message: "Email address already exists"
                        });
                  }
                  return res.status(500).json({
                        message: error.message,
                        status: "error"
                  });
            }
      };

      // user login
      async loginUser(req, res) {
            try {
                  const { email, password } = req.body;

                  const user = await User.findOne({ email });

                  if (!user) {
                        return res.status(404).json({
                              message: "Account not found",
                              status: "error"
                        })
                  }

                  const isMatch = await bcrypt.compare(password, user.password)

                  if (!isMatch) {
                        return res.status(401).json({
                              message: "Invalid email or password",
                              status: "error"
                        })
                  }

                  const token = jwt.sign({
                        userId: user._id,
                        email: user.email
                  }, process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRES_IN }
                  );

                  return res.status(200).json({
                        message: "Login successful",
                        status: "success",
                        token
                  })

            } catch (error) {
                  return res.status(500).json({
                        message: error.message,
                        status: "error"
                  })
            }
      }

      // get all users
      async getUsers(req, res) {
            try {
                  const users = await User.find().select("-password");

                  if (users.length === 0) {
                        return res.status(404).json({
                              message: "No users found",
                              status: "error"
                        })
                  }

                  return res.status(200).json({
                        message: "All users fetched successfully",
                        status: "success",
                        data: users
                  });

            } catch (error) {
                  return res.status(500).json({
                        message: error.message,
                        status: "error"
                  });
            }
      };


      // get user by their id
      async getUser(req, res) {
            try {
                  const user = await User.findById(req.params.id).select("-password");

                  if (!user) {
                        return res.status(404).json({
                              message: "User not found",
                              status: "error"
                        });
                  }

                  return res.status(200).json({
                        message: "User fetched successfully",
                        status: "success",
                        data: user
                  });

            } catch (error) {
                  return res.status(500).json({
                        message: error.message,
                        status: "error"
                  });
            }
      };
      // edit and update user
      async updateUser(req, res) {
            try {
                  const user = await User.findById(req.params.id).select("-password");

                  if (!user) {
                        return res.status(404).json({
                              message: "User not found",
                              status: "error"
                        });
                  }

                  const { name, email, password } = req.body;

                  user.name = name;
                  user.email = email;

                  if (password) {
                        user.password = await bcrypt.hash(password, 12);
                  }

                  await user.save();

                  return res.status(200).json({
                        message: "User updated successfully",
                        status: "success",
                        data: user
                  });

            } catch (error) {
                  return res.status(500).json({
                        message: error.message,
                        status: "error"
                  });
            }
      }

      // delete user
      async deleteUser(req, res) {
            try {
                  const user = await User.findByIdAndDelete(req.params.id)

                  if (user) {
                        return res.status(200).json({
                              message: "User deleted successfully",
                              status: "success"
                        })
                  }
            } catch (error) {
                  return res.status(500).json({
                        message: error.message
                  });
            };
      }

}

module.exports = new UserController;
const User = require("../models/userModel");

class UserController {

      // create user profile
      async createUser(req, res) {
            try {
                  const { name, email, password } = req.body;

                  const user = await User.create({
                        name,
                        email,
                        password
                  });

                return res.status(201).json({
                        message: "User created successfully",
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

      // get all users
      async getUsers(req, res) {
            try {
                  const users = await User.find();

                  if (!users) {
                        return res.status(400).json({
                              message: "Users not found",
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
                  const user = await User.findById(req.params.id);

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
                        if(error.code === 11000){
                              if (error.keyPattern?.email) {
                              return res.status(409).json({
                                    status: "error",
                                    message: "Email address already exists"
                              });
                              }
                        }
                  return res.status(500).json({
                        message: error.message,
                        status: "error"
                  });
            }           
      };

      // edit and update user
      async updateUser(req, res) {
            try {

                  const {name, email, password } = req.body;
                  
                  const user = await User.findByIdAndUpdate(req.params.id, {
                        name,
                        email,
                        password
                  }, { new: true });

                  if (user) {
                        return res.json({
                              message: "User updated successfully",
                              status: "success",
                              data : user
                        }).status(202)
                  }
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
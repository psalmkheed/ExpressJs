const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      name: {
            type: String, 
            required: [true, "Name is required"]
      },
      email: {
            type: String, 
            required: [true, "Email is required"],
            unique: true
      },
      username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            match: [
                  /^[a-zA-Z0-9_-]+$/,
                  "Username can only contain letters, numbers, underscores, and hyphens"
            ]
      },
      password: {
            type: String, 
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"]

      },

      products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
      }]
},
      {
            timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User
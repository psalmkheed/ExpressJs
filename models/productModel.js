const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

      name: {
            type: String, required: [true, "Product name is required"], trim: true
      },
      description: {
            type: String, required: [true, "Product description is required"], trim: true
      },
      price: {
            type: Number, required: [true, "Product price is required"]
      },
      category: {
            type: String, required: [true, "Product category is required"]
      },
      availability: {
            type: Boolean, default: true
      },
      quantity: {
            type: Number, required: [true, "Product quantity is required"]
      },
      image: {
            type: String, required: [true, "Product image is required"]
      }

}, {
      timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
      }
})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
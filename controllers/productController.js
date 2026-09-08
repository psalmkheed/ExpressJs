const Product = require('../models/productModel');

const User = require('../models/userModel');

class ProductController {
      async uploadProduct(req, res) {
            try {
                  const getUserID = await User.findById(req.params.id);                
                  const { name, description, price, category, availability, quantity, image } = req.body;

                  if (!getUserID) {
                        return res.status(404).json({
                              message: "User not found",
                              status: "error"
                        });
                  }
                  const product = await Product.create({
                        name,
                        description,
                        price,
                        category,
                        availability,
                        quantity,
                        image
                  });

                  await getUserID.products.push(product._id);
                  await getUserID.save();
                  res.status(201).json({
                        message: "Product uploaded successfully",
                        data: product,
                        status: "success"
                  });
            } catch (error) {
                  res.status(500).json({
                         message: error.message,
                         status: "error" 
                        });
            }
      }

      async getAllProducts(req, res) {
            try {
                  const products = await Product.find();
                  res.status(200).json({
                        message: "All products fetched successfully",
                        data: products,
                        status: "success"
                  });
            } catch (error) {
                  res.status(500).json({ 
                        message: error.message, 
                        status: "error" 
                  });
            }
      }
}

module.exports = new ProductController();
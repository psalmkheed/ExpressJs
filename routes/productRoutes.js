const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.post("/upload/:id", productController.uploadProduct);
router.get("/all", productController.getAllProducts);

module.exports = router;
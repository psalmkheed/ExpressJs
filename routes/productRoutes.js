const express = require("express");
const upload = require("../config/multer")
const router = express.Router();

const productController = require("../controllers/productController");

router.post("/upload/:id", upload.single('image'), productController.uploadProduct);
router.get("/all", productController.getAllProducts);

module.exports = router;
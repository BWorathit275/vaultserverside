const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getAllProducts);
router.get("/products/search/:keyword", productController.searchProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.delete("/products/:id", productController.softDeleteProduct);
router.put("/products/restore/:id", productController.restoreProduct);

module.exports = router;

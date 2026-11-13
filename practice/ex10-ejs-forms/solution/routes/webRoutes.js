const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Web page: list books as HTML (built with a template string).
router.get("/", (req, res) => res.redirect("/products"));
router.get("/products", productController.list);
router.get("/products/new", productController.newForm); // before /products/:id
router.post("/products", productController.create);
router.get("/products/:id", productController.show);
router.post("/products/:id/delete", productController.remove);

module.exports = router;

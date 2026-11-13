const Category = require("../models/categoryModel");

const categoryController = {
  // GET all categories.
  getAllCategories: (req, res) => {
    Category.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  // 404 if the category doesn't exist; [] if it exists but has no products
  getCategoryProducts: (req, res) => {
    Category.getById(req.params.id, (err, categories) => {
      if (err) return res.status(500).json({ error: err.message });
      if (categories.length === 0) return res.status(404).json({ error: "Category not found" });
      Category.getProducts(req.params.id, (err2, products) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(products);
      });
    });
  },
};

module.exports = categoryController;

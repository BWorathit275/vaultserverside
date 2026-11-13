const Product = require("../models/productModel");

// Form fields always arrive as strings.
function validate(body) {
  const errors = [];
  const name = (body.name || "").trim();
  const price = Number(body.price);
  if (name === "") errors.push("Name is required");
  if (body.price === undefined || body.price === "" || Number.isNaN(price) || price <= 0) {
    errors.push("Price must be a number greater than 0");
  }
  return { errors, values: { name, price, description: (body.description || "").trim() } };
}

const productController = {
  // GET /products?q=keyword  (search form uses method="GET" -> query string)
  list: (req, res) => {
    const q = req.query.q || "";
    Product.getAll(q, (err, products) => {
      if (err) return res.status(500).send(err.message);
      res.render("products", { title: "Products", products, q });
    });
  },

  // GET /products/new
  newForm: (req, res) => {
    res.render("new-product", { title: "Add product", errors: [], values: { name: "", price: "", description: "" } });
  },

  // POST /products  (form method="POST" -> req.body via express.urlencoded)
  create: (req, res) => {
    const { errors, values } = validate(req.body);
    if (errors.length > 0) {
      // re-show the form with the messages and what the user typed
      return res.status(400).render("new-product", {
        title: "Add product",
        errors,
        values: { ...values, price: req.body.price || "" },
      });
    }
    Product.create(values, (err, product) => {
      if (err) return res.status(500).send(err.message);
      res.redirect(`/products/${product.id}`); // Post/Redirect/Get: refresh won't resubmit
    });
  },

  // GET /products/:id
  show: (req, res) => {
    Product.getById(Number(req.params.id), (err, product) => {
      if (err) return res.status(500).send(err.message);
      if (!product) return res.status(404).render("404", { title: "Not found" });
      res.render("product", { title: product.name, product });
    });
  },

  // POST /products/:id/delete  (HTML forms only support GET and POST)
  remove: (req, res) => {
    Product.softDelete(Number(req.params.id), (err, result) => {
      if (err) return res.status(500).send(err.message);
      if (result.affectedRows === 0) return res.status(404).render("404", { title: "Not found" });
      res.redirect("/products");
    });
  },
};

module.exports = productController;

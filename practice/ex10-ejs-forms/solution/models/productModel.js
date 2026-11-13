// In-memory data with the same callback style as db.query.
let nextId = 4;
const products = [
  { id: 1, name: "White T-shirt", price: 299, description: "Cotton, regular fit", is_deleted: 0 },
  { id: 2, name: "Clean Code", price: 890, description: "A book about writing readable code", is_deleted: 0 },
  { id: 3, name: "Phone Case", price: 199, description: "", is_deleted: 0 },
];

const Product = {
  getAll: (keyword, callback) => {
    const term = (keyword || "").toLowerCase();
    callback(null, products.filter((p) => p.is_deleted === 0 && p.name.toLowerCase().includes(term)));
  },
  getById: (id, callback) => {
    callback(null, products.find((p) => p.id === id && p.is_deleted === 0));
  },
  create: ({ name, price, description }, callback) => {
    const product = { id: nextId++, name, price, description, is_deleted: 0 };
    products.push(product);
    callback(null, product);
  },
  softDelete: (id, callback) => {
    const product = products.find((p) => p.id === id && p.is_deleted === 0);
    if (!product) return callback(null, { affectedRows: 0 });
    product.is_deleted = 1;
    callback(null, { affectedRows: 1 });
  },
};

module.exports = Product;

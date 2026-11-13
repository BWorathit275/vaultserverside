-- Runs automatically the first time the MySQL container starts.
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT NULL,
  review_count INT DEFAULT 0,
  category_id INT,
  is_deleted TINYINT DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name) VALUES ('Clothing'), ('Phones'), ('Books');

INSERT INTO products (name, price, discount, review_count, category_id) VALUES
('White T-shirt', 299.00, 50.00, 125, 1),
('Denim Jacket', 1590.00, NULL, 40, 1),
('Running Shoes', 2490.00, 300.00, 310, 1),
('Wool Scarf', 450.00, NULL, 12, 1),
('iPhone 17', 37900.00, NULL, 980, 2),
('iPhone 15', 27900.00, 2000.00, 1520, 2),
('Budget Phone', 3990.00, NULL, 75, 2),
('Phone Case', 199.00, NULL, 64, 2),
('Clean Code', 890.00, NULL, 210, 3),
('Refactoring', 1200.00, 100.00, 95, 3),
('JavaScript Basics', 350.00, NULL, 33, 3),
('Node.js Handbook', 650.00, NULL, 58, 3);

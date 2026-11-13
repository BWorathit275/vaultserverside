// In-memory stand-in for the lab's MySQL connection.
// In the lab: mysql.createConnection({...process.env...}) and db.query(sql, params, callback).
const books = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", price: 890, is_deleted: 0 },
  { id: "2", title: "The Pragmatic Programmer", author: "Hunt & Thomas", price: 950, is_deleted: 0 },
  { id: "3", title: "JavaScript: The Good Parts", author: "Douglas Crockford", price: 420, is_deleted: 0 },
];

module.exports = books;

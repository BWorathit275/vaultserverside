// In-memory "database" (in the lab: MySQL via configs/db.js).
const users = []; // { id, username, password (bcrypt hash), role: "member" | "librarian" }

const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", copies: 2, is_deleted: 0 },
  { id: 2, title: "Refactoring", author: "Martin Fowler", copies: 1, is_deleted: 0 },
  { id: 3, title: "You Don't Know JS", author: "Kyle Simpson", copies: 0, is_deleted: 0 },
];

const SESSIONS = new Map(); // sessionId -> { id, username, role }

module.exports = { users, books, SESSIONS };

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
app.use(express.json());
// TODO: cors with origin http://127.0.0.1:5500 and credentials
// TODO: cookieParser

const USERS = new Map();
USERS.set("Admin", { id: 1, username: "Admin", role: "Admin" });
USERS.set("Lecturer", { id: 2, username: "Lecturer", role: "Lecturer" });

const SESSIONS = new Map(); // sessionId -> user

const COOKIE_OPTIONS = { secure: true, httpOnly: true, sameSite: "none" };

// Log in: unknown user -> clear old session + 401; known user -> new session cookie.
app.post("/login", (req, res) => {
  // TODO
});

// Return the logged-in user's name and role, or 401.
app.get("/me", (req, res) => {
  // TODO
});

// Admin-only data: 401 if not logged in, 403 if not Admin.
app.get("/adminData", (req, res) => {
  // TODO
});

// Log out: delete the server session and clear the cookie.
app.post("/logout", (req, res) => {
  // TODO
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

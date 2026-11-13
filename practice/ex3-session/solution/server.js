const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
app.use(cookieParser());

const USERS = new Map();
USERS.set("Admin", { id: 1, username: "Admin", role: "Admin" });
USERS.set("Lecturer", { id: 2, username: "Lecturer", role: "Lecturer" });

const SESSIONS = new Map(); // sessionId -> user

// Must match when clearing the cookie
const COOKIE_OPTIONS = { secure: true, httpOnly: true, sameSite: "none" };

// Log in: unknown user -> clear old session + 401; known user -> new session cookie.
app.post("/login", (req, res) => {
  const user = USERS.get(req.body.username);
  if (user == null) {
    SESSIONS.delete(req.cookies.sessionId);         // remove old session on the server
    res.clearCookie("sessionId", COOKIE_OPTIONS);   // remove cookie in the browser
    return res.sendStatus(401);                     // login failed
  }
  const sessionId = crypto.randomUUID();            // UUID v4
  SESSIONS.set(sessionId, user);                    // session data stays on the server
  res.cookie("sessionId", sessionId, COOKIE_OPTIONS).send(`Authed as ${user.username}`);
});

// Return the logged-in user's name and role, or 401.
app.get("/me", (req, res) => {
  const user = SESSIONS.get(req.cookies.sessionId);
  if (user == null) return res.sendStatus(401);
  res.json({ username: user.username, role: user.role });
});

// Admin-only data: 401 if not logged in, 403 if not Admin.
app.get("/adminData", (req, res) => {
  const user = SESSIONS.get(req.cookies.sessionId);
  if (user == null) return res.sendStatus(401);       // not logged in
  if (user.role !== "Admin") return res.sendStatus(403); // logged in, not allowed
  res.send("Authorized: admin data");
});

// Log out: delete the server session and clear the cookie.
app.post("/logout", (req, res) => {
  SESSIONS.delete(req.cookies.sessionId);
  res.clearCookie("sessionId", COOKIE_OPTIONS);
  res.send("Logged out");
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

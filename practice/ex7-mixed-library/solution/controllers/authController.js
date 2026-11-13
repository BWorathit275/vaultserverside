const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/userModel");
const { SESSIONS } = require("../configs/data");
const { validateUsername, validatePassword } = require("../utils/validators");

const COOKIE_OPTIONS = { secure: true, httpOnly: true, sameSite: "lax" };

const authController = {
  // POST register: validate, reject duplicates (409), hash the password, create the user (201).
  register: async (req, res) => {
    const { username, password, role } = req.body;
    if (!validateUsername(username)) return res.status(400).json({ error: "Invalid username" });
    if (!validatePassword(password)) return res.status(400).json({ error: "Password must be 8+ characters with a number" });
    if (User.findByUsername(username)) return res.status(409).json({ error: "Username already taken" });
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = User.create(username, hash, role === "librarian" ? "librarian" : "member");
      res.status(201).json({ id: user.id, username: user.username, role: user.role }); // never return the hash
    } catch {
      res.status(500).send();
    }
  },

  // POST login: check the password with bcrypt; on success start a session cookie, on failure clear it (401).
  login: async (req, res) => {
    const user = User.findByUsername(req.body.username);
    try {
      const ok = user != null && (await bcrypt.compare(req.body.password || "", user.password));
      if (!ok) {
        SESSIONS.delete(req.cookies.sessionId);          // drop any old session
        res.clearCookie("sessionId", COOKIE_OPTIONS);
        return res.status(401).json({ error: "Invalid username or password" }); // same message for both cases
      }
      const sessionId = crypto.randomUUID();
      SESSIONS.set(sessionId, { id: user.id, username: user.username, role: user.role });
      res.cookie("sessionId", sessionId, COOKIE_OPTIONS).json({ message: `Logged in as ${user.username}` });
    } catch {
      res.status(500).send();
    }
  },

  // POST logout: delete the server session and clear the cookie.
  logout: (req, res) => {
    SESSIONS.delete(req.cookies.sessionId);
    res.clearCookie("sessionId", COOKIE_OPTIONS);
    res.json({ message: "Logged out" });
  },

  // GET me: return the logged-in user (set by requireLogin).
  me: (req, res) => {
    res.json(req.user); // set by requireLogin
  },
};

module.exports = authController;

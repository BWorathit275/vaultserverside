const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/userModel");
const { SESSIONS } = require("../configs/data");
const { validateUsername, validatePassword } = require("../utils/validators");

const COOKIE_OPTIONS = { secure: true, httpOnly: true, sameSite: "lax" };

const authController = {
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

  logout: (req, res) => {
    SESSIONS.delete(req.cookies.sessionId);
    res.clearCookie("sessionId", COOKIE_OPTIONS);
    res.json({ message: "Logged out" });
  },

  me: (req, res) => {
    res.json(req.user); // set by requireLogin
  },
};

module.exports = authController;

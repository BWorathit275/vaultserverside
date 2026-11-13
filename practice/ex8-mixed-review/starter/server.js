const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { canRegister, isValidBio } = require("./utils/rules");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

const users = []; // { username, password, age, role, bio }
const SESSIONS = new Map();

app.post("/api/register", async (req, res) => {
  const { username, password, age } = req.body;
  if (!username || !password) return res.status(400).send("username and password are required");
  if (!canRegister(age)) return res.status(400).send("You must be 18 or older");
  if (users.some((u) => u.username === username)) return res.status(409).send("Username taken");
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash, age, role: users.length === 0 ? "admin" : "user", bio: "" });
  res.status(201).send("Registered");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/login", async (req, res) => {
  const user = users.find((u) => u.username === req.body.username);
  if (user == null) return res.status(401).send("Invalid username or password");
  if (bcrypt.compare(req.body.password, user.password)) {
    const sessionId = crypto.randomUUID();
    SESSIONS.set(sessionId, user);
    res.cookie("sessionId", sessionId);
    res.cookie("role", user.role);
    return res.send(`Welcome ${user.username}`);
  }
  res.status(401).send("Invalid username or password");
});

function requireLogin(req, res, next) {
  const user = SESSIONS.get(req.cookies.sessionId);
  if (user == null) return res.sendStatus(401);
  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  if (req.cookies.role !== "admin") return res.sendStatus(401);
  next();
}

app.put("/api/profile", requireLogin, (req, res) => {
  if (!isValidBio(req.body.bio)) return res.status(400).send("Bio too long");
  req.user.bio = req.body.bio.trim();
  res.send("Profile updated");
});

app.get("/api/admin/stats", requireLogin, requireAdmin, (req, res) => {
  res.json({ users: users.length, sessions: SESSIONS.size });
});

app.get("/profile/:username", (req, res) => {
  const user = users.find((u) => u.username === req.params.username);
  if (!user) return res.status(404).send("Not found");
  res.render("profile", { user });
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

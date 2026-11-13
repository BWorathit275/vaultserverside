const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const users = [];

// List all users (passwords are stored as hashes).
app.get("/users", (req, res) => {
  // TODO
});

// Register: hash the password with bcrypt and save the user (201).
app.post("/users", async (req, res) => {
  // TODO
});

// Log in: find the user, then bcrypt.compare the password.
app.post("/users/login", async (req, res) => {
  // TODO
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

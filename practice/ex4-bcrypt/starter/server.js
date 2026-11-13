const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  // TODO
});

app.post("/users", async (req, res) => {
  // TODO
});

app.post("/users/login", async (req, res) => {
  // TODO
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

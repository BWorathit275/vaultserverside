const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send("name and password are required");
  }
  if (users.some((u) => u.name === name)) {
    return res.status(409).send("User already exists"); // bonus 1
  }
  try {
    const salt = await bcrypt.genSalt();                 // default cost factor 10
    const hashedPassword = await bcrypt.hash(password, salt);
    users.push({ name, password: hashedPassword });
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((u) => u.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
    // bonus 2: use the same response as a wrong password instead, e.g.
    // return res.status(401).send("Invalid name or password");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

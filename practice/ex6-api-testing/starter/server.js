const express = require("express");

const app = express();
app.use(express.json());

const USERS = { user1: "12345", user2: "12345", anonymous: "12345" };

let nextId = 4;
const tasks = [
  { id: 1, title: "Keep studying Jest", status: "In Progress", owner: "anonymous" },
  { id: 2, title: "Write API test plan", status: "Draft", owner: "user1" },
  { id: 3, title: "Refactor to MVC", status: "Done", owner: "user2" },
];

// Basic Auth: "Authorization: Basic base64(username:password)"
function basicAuth(req, res, next) {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Basic ")) return res.sendStatus(401);
  const [username, password] = Buffer.from(header.slice(6), "base64").toString().split(":");
  if (USERS[username] !== password) return res.sendStatus(401);
  req.user = username;
  next();
}

app.use(basicAuth);

// Return the username of the authenticated user.
app.get("/user/me", (req, res) => {
  res.json({ username: req.user });
});

// List tasks, optionally filtered by ?status= and ?search=.
app.get("/tasks", (req, res) => {
  let result = tasks;
  if (req.query.status) result = result.filter((t) => t.status === req.query.status);
  if (req.query.search) result = result.filter((t) => t.title.includes(req.query.search));
  res.json(result);
});

// Get one task by id.
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  res.json({ id: task.id, title: task.title, status: task.status, owner: task.owner });
});

// Create a task owned by the logged-in user (201).
app.post("/tasks", (req, res) => {
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const task = { id: nextId++, title: title.trim(), status: status || "Draft", owner: req.user };
  tasks.push(task);
  res.status(201).json(task);
});

// Update a task's title/status; only the owner may edit (403).
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (task.owner !== req.user) return res.status(403).json({ error: "Not your task" });
  task.title = req.body.title;
  task.status = req.body.status;
  res.json(task);
});

// Delete a task.
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

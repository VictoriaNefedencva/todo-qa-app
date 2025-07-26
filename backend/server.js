const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url} - body: ${JSON.stringify(req.body)}\n`;
  fs.appendFileSync("server.log", log);
  console.log(log.trim());
  next();
});

let users = [{ username: "test", password: "test" }];
let todos = [{ id: 1, text: "Initial todo", done: false }];

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (token === "Bearer test-token") return next();
  res.status(401).json({ error: "Unauthorized" });
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ token: "test-token" });
  res.status(401).json({ error: "Invalid credentials" });
});

app.get("/items", authenticate, (req, res) => {
  res.json(todos);
});

app.post("/items", authenticate, (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });
  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put("/items/:id", authenticate, (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  todo.text = req.body.text ?? todo.text;
  todo.done = req.body.done ?? todo.done;
  res.json(todo);
});

app.delete("/items/:id", authenticate, (req, res) => {
  const idx = todos.findIndex(t => t.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  todos.splice(idx, 1);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(4000, () => console.log("API on http://localhost:4000"));
}
module.exports = app;
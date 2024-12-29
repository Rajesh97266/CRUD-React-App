const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 8000;

// Load users from sample.json
const filePath = path.join(__dirname, "sample.json");
let users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

app.use(cors());
app.use(express.json());

// Function to save users back to sample.json
const saveUsersToFile = () => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
};

// Display All Users
app.get("/users", (req, res) => {
  return res.json(users);
});

// Add New User
app.post("/users", (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  saveUsersToFile(); // Persist changes to file
  return res.json({ message: "User added successfully", user: newUser });
});

// Edit User
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.map((user) =>
    user.id === parseInt(id) ? { ...user, ...req.body } : user
  );
  saveUsersToFile(); // Persist changes to file
  return res.json({ message: "User updated successfully" });
});

// Delete User
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== parseInt(id));
  saveUsersToFile(); // Persist changes to file
  return res.json({ message: "User deleted successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();
const port = 8000;
const users = require("./sample.json");

//Display All users
app.get("/users", (req, res) => {
  return res.json(users);
});

app.listen(port, (err) => {
  console.log(`Example app listening on port ${port}`);
});

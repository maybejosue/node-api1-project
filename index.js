const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

const users = [];

server.post("/api/users", (req, res) => {
  const info = req.body;
  if (info.name.length > 1 && info.bio.length > 1) {
    info.id = shortid.generate();
    users.push(info);
    res.status(201).json(info);
  } else if (info.name.length < 1 || info.bio.length < 1) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  }
});

server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res.status(200).json(users);
  }
});

server.get("/api/users/:id", (req, res) => {
  const sentId = req.params.id;
  const user = users.find((userID) => {
    return userID.id === sentId;
  });

  console.log(`logging the user`, user, sentId);

  if (user) {
    res.status(200).json(user);
  } else if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

const PORT = 5000;
server.listen(PORT, (req, res) => {
  console.log(`Hello in localhost ${PORT}`);
});

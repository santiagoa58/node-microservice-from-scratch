const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (_req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = createId();
  const { title } = req.body;
  posts[id] = { id, title };
  try {
    await axios.post("http://localhost:4005/events", {
      id,
      title,
    });
  } catch (error) {
    console.error(error);
  }

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});

function createId() {
  return randomBytes(4).toString("hex");
}

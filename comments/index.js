const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = createId();
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const comment = { id: commentId, content, status: "pending" };
  comments.push(comment);
  commentsByPostId[req.params.id] = comments;
  axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: { ...comment, postId: req.params.id },
    })
    .catch((error) => console.error(error));
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);
    comment.status = status;
    axios
      .post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: { ...comment, postId },
      })
      .catch((error) => console.error(error));
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});

function createId() {
  return randomBytes(4).toString("hex");
}

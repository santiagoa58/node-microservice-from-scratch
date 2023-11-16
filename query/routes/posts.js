const express = require("express");

const router = express.Router();

const posts = {};

router.get("/posts", (_req, res) => {
  res.json(posts);
});

router.get("/posts/:id", (_req, res) => {
  res.json(posts[req.params.id] || []);
});

router.get("/posts/:id/comments", (req, res) => {
  const comments = posts[req.params.id]?.comments || [];
  res.json(comments);
});

router.post("/events", (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "PostCreated": {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case "CommentCreated": {
      const { id, content, postId } = data;
      const post = posts[postId];
      post.comments.push({ id, content });
      break;
    }
  }
  res.json({ msg: "success" });
});

module.exports = router;

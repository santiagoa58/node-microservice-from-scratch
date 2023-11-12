const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}

const commentsByPost = {}

app.get("/posts", (_req, res) => {
    res.send(posts);
});

app.get("/posts/:id/comments", (req, res) => {
    const comments = commentsByPost[req.params.id] || [];
    res.send(comments);
});


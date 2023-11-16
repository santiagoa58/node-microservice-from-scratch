const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(postsRouter);

app.listen(4002, () => {
  console.log("Listening on 4002");
});

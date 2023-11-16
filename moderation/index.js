const express = require("express");
const commentRoutes = require("./commentRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(commentRoutes);

app.listen(4003, () => {
  console.log("Listening on 4003");
});

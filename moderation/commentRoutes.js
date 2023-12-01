const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { ...data, status },
      });
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = router;

import axios from "axios";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/events", async (req, res) => {
  const event = req.body;
  try {
    await axios.post("http://localhost:4000/events", event); //posts
  } catch (error) {
    console.error("POST ERROR: ", error.message);
  }
  try {
    await axios.post("http://localhost:4001/events", event); //comments
  } catch (error) {
    console.error("COMMENTS ERROR: ", error.message);
  }
  try {
    axios.post("http://localhost:4002/events", event); //query
  } catch (error) {
    console.error("QUERY ERROR: ", error.message);
  }
  try {
    axios.post("http://localhost:4003/events", event); //moderation
  } catch (error) {
    console.error("MODERATION ERROR: ", error.message);
  }

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on Port 40005");
});

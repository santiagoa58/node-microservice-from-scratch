import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());

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
  // axios.post('http://localhost:4002/events', event);
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on Port 40005");
});

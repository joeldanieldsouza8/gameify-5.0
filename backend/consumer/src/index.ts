import express from "express";

const app = express(); // Create an express app instance

app.use(express.json()); // Middleware to parse JSON data

app.post("/processData", (req, res) => {
  console.log(req.body); // Log the data received from the consumer
  res.send("Data received successfully!"); // Send a response to the consumer
});

app.listen(5000, () => {
  console.log("Producer service is running on port 5000");
});

const express = require("express"); // Import express
const app = express(); // Create express app

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Chef Marco's Italian Bistro!");
});

// Start server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

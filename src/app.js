require("dotenv").config();
const express = require("express");
const setRoutes = require("./routes/index");
const app = express();

// Middleware
app.use(express.json());

// Set up routes
setRoutes(app);

app.listen(3000, () => {
  console.log("API listening on port 3000");
});

// Export the app
module.exports = app;

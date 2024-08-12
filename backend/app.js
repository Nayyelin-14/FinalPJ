const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// In Express, you need middleware to parse incoming request bodies because HTTP requests and responses are just streams of data. The middleware helps convert these streams into a format (e.g., JSON, URL-encoded) that you can easily work with in your Express routes and controllers.
//global middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//routes
app.use(authRoutes);
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(4000);
  console.log("Server is running at 4000");
});

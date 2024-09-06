const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const multer = require("multer");
const adminRoutes = require("./routes/Admin");
const publicRoutes = require("./routes/Public");
const productRoutes = require("./routes/Products");
require("dotenv").config();
const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// In Express, you need middleware to parse incoming request bodies because HTTP requests and responses are just streams of data. The middleware helps convert these streams into a format (e.g., JSON, URL-encoded) that you can easily work with in your Express routes and controllers.
//global middleware
const storageConfig = multer.diskStorage({
  // dest: databse nk store mhr m log file destination m lo
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});

const filterConfig = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};
app.use(cors({ origin: "https://market-place-client-qc75.onrender.com/" }));
app.use(bodyParser.json());
app.use(
  multer({ storage: storageConfig, fileFilter: filterConfig }).array(
    "product_images"
  )
);
app.use("/uploads", express.static("uploads"));
//routes
app.use(authRoutes);
app.use(productRoutes);
app.use(adminRoutes);
app.use("/api", publicRoutes);

const PORT = 4100;
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT);
  console.log(`Server is running at port - ${PORT}`);
});

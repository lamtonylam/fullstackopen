const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

// modules
const config = require("./utils/config");
const Blog = require("./models/blog");
const blogsRouter = require("./controllers/blogs");

logger.info('connecting to', config.MONGODB_URI)

// mongoose
mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
app.use(cors());
app.use(express.json());

// routes modules that handles all the routes
app.use("/api/blogs/", blogsRouter);

module.exports = app;

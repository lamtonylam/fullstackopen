const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// modules
const config = require("./utils/config");
const Blog = require("./models/blog");
const blogsRouter = require("./controllers/blogs");

// mongoose
mongoose.set("strictQuery", false);

console.log(config.MONGODB_URl);
mongoose.connect(config.MONGODB_URl);

app.use(cors());
app.use(express.json());

// routes modules that handles all the routes
app.use("/api/blogs/", blogsRouter);

module.exports = app;

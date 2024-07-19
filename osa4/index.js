const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// modules
const config = require("./utils/config");
const Blog = require("./models/blog");
const blogsRouter = require("./controllers/blogs")

// mongoose
const mongoUrl = `mongodb+srv://tonylam:${config.password}@cluster.6hp2tkl.mongodb.net/osa4?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

// routes modules that handles all the routes
app.use("/api/blogs/", blogsRouter)


const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("../tests/test_helper");
const jwt = require("jsonwebtoken");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    // get user token and verify it
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    // find the user that is logged
    const user = await User.findById(decodedToken.id);

    if (!body.title || !body.url) {
        return response.status(400).json({ error: "Title or URL is missing" });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    const blog_id = request.params.id;

    // get user token and verify it
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    // find the user that is logged in
    const user = await User.findById(decodedToken.id);
    const user_id = user._id.toString();

    const blog = await Blog.findById(blog_id);

    if (blog.user.toString() === user_id) {
        await Blog.findByIdAndDelete(blog_id);
    } else {
        return response.status(401).json({
            error: "forbidden, you are not the blog creator",
        });
    }
    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id;

    const body = request.body;

    const blog_model = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };

    const modified_blog = await Blog.findByIdAndUpdate(id, blog_model, {
        new: true,
    });
    response.status(200).json(modified_blog);
});

module.exports = blogsRouter;

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    if (!body.title || !body.url) {
        return response.status(400).json({ error: "Title or URL is missing" });
    }

    const blog = new Blog({
        title: body.title,
        author: body.title,
        url: body.url,
        likes: body.likes,
    });

    try {
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (exception) {
        console.log(exception);
    }
});

module.exports = blogsRouter;

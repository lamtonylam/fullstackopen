const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");

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

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;

    await Blog.findByIdAndDelete(id);
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

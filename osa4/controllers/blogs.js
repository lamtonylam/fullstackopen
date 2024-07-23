const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("../tests/test_helper");
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

    var first_user_in_db = await helper.usersInDb();
    var first_user_in_db = first_user_in_db[0].id;

    const user = await User.findById(first_user_in_db);

    // temporarily disable this for further tasks
    // 4.17: blogilistan laajennus, step5
    // const user = await User.findById(body.userId);

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

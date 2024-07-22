const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");

const api = supertest(app);

const Blog = require("../models/blog");

// before each test we delete all blog entries from DB
// then add them one by one
beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(helper.initial_blogs[0]);
    await blogObject.save();
    blogObject = new Blog(helper.initial_blogs[1]);
    await blogObject.save();
});

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs/")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, 2);
});

test("the blog id's are in correct form", async () => {
    const response = await api.get("/api/blogs");
    // get all the keys in the first blog dict
    const response_key = Object.keys(response.body[0]);
    // get the last key in dict, which should be id
    const last_key = response_key.slice(-1)[0];

    assert.strictEqual(last_key, "id");
});

test.only("posting blog", async () => {
    const newBlog = {
        title: "Badabim badabum",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response._body.map((r) => r.title);

    assert.strictEqual(response.body.length, helper.initial_blogs.length + 1);
    assert(titles.includes("Badabim badabum"));
});

after(async () => {
    await mongoose.connection.close();
});

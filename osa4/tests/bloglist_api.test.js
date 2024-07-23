const { test, describe, after, beforeEach } = require("node:test");
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

describe("when there is initially two blogs saved", () => {
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
});

describe("posting blog", () => {
    test("posting blog normally", async () => {
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

        assert.strictEqual(
            response.body.length,
            helper.initial_blogs.length + 1
        );
        assert(titles.includes("Badabim badabum"));
    });

    test("without likes", async () => {
        const newBlog = {
            title: "Badabim badabum",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/blogs");

        // likes amount from the badabim badabum blog
        const like = response._body[2].likes;

        assert.strictEqual(
            response.body.length,
            helper.initial_blogs.length + 1
        );

        // asserting the third blog likes should be 0
        assert(like === 0);
    });

    test.only("without title or url result in 400 status code", async () => {
        const newBlog = {
            title: "Badabim badabum",
            author: "Edsger W. Dijkstra",
            likes: 50,
        };

        await api.post("/api/blogs").send(newBlog).expect(400);

        const response = await api.get("/api/blogs");

        // asserting that adding did not succeed
        assert.strictEqual(response._body.length, helper.initial_blogs.length);
    });
});

describe.only("deleteion of a note", () => {
    test.only("succeeds with status code 204 if id is valid", async () => {
        // getting the id of first blog item to delete
        var blogs_at_first = await api.get("/api/blogs");
        var blogs_at_first = blogs_at_first._body;
        var blog_to_delete_id = blogs_at_first[0].id;

        const response = await api.delete(`/api/blogs/${blog_to_delete_id}`);
        const status_code = response.statusCode;

        // check that deletion response code is really 204
        assert.strictEqual(status_code, 204);

        const blogs_at_end = await api.get("/api/blogs");

        // check that blogs at the end length is one blog shorter
        assert.strictEqual(
            blogs_at_end._body.length,
            helper.initial_blogs.length - 1
        );
    });
});

after(async () => {
    await mongoose.connection.close();
});

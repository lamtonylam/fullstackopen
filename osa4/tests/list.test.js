const { test, describe } = require("node:test");
const assert = require("node:assert");

const { dummy, totalLikes } = require("../utils/list_helper");

test("dummy return one", () => {
    const blogs = [];

    const result = dummy(blogs);
    assert.strictEqual(result, 1);
});

describe("total likes", () => {
    const one_blog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0,
        },
    ];
    const multiple_blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0,
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0,
        },
    ];
    test("of empty list is zero", () => {
        assert.strictEqual(totalLikes([]), 0);
    });
    test("when list has only one blog equals the likes of that", () => {
        assert.strictEqual(totalLikes(one_blog), 7);
    });
    test("of a bigger list is calculated right", () => {
        assert.strictEqual(totalLikes(multiple_blogs), 12);
    });
});

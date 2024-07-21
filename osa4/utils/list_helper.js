const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const likes = blogs.reduce(
        (accumulator, blog) => accumulator + blog.likes,
        0
    );
    return likes;
};

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current;
    });
};

const mostBlogs = (blogs) => {
    // get a list of author names
    var nameArray = _.map(blogs, "author");
    // count occurences of persons
    let freq = _.countBy(nameArray);
    // sort the occureances
    var sorted_freq = _.sortBy(Object.entries(freq), [(o) => o[1]]).reverse();
    // get the first person
    var most_blogs = sorted_freq[0];

    return {
        author: most_blogs[0],
        blogs: most_blogs[1],
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
};

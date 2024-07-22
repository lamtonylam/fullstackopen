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

const mostLikes = (blogs) => {
    // grouping blogs by author
    const groupedByAuthor = _.groupBy(blogs, "author");

    // getting likes by author
    const likesByAuthor = _.mapValues(groupedByAuthor, (blogs) =>
        _.sumBy(blogs, "likes")
    );

    // most liked author
    const mostLikedAuthor = _.maxBy(
        _.keys(likesByAuthor),
        (author) => likesByAuthor[author]
    );

    // most like amount
    const mostLikedAmount = likesByAuthor[mostLikedAuthor];

    return {
        author: mostLikedAuthor,
        likes: mostLikedAmount,
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};

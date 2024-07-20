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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};

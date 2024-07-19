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

module.exports = {
    dummy,
    totalLikes,
};

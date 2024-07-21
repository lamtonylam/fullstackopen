require("dotenv").config();

let PORT = process.env.PORT;

let MONGODB_URl = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URl
    : process.env.MONGODB_URl

module.exports = {
    PORT,
    MONGODB_URl
};

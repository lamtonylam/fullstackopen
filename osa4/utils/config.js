require("dotenv").config();

let PORT = process.env.PORT;

let password = process.env.password;

module.exports = {
    PORT,
    password,
};

const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger");

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
    });
    response.json(users);
});

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    if (!password) {
        logger.error("password is required");
        return response.status(400).json({
            error: "password is required",
        });
    }

    if (password.length < 3) {
        logger.error("password too short");
        return response.status(400).json({
            error: "passworld length must be at least 3 char",
        });
    }

    // password hashing
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

module.exports = usersRouter;

const User = require("../models/user");
const { createPasswordHash, signToken, validatePassword } = require("./auth");
const { body, validationResult } = require("express-validator"); 

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return emailRegex.test(email);
}

async function findUserById(email) {
    // Validate email before querying
    if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
    }

    const acc = await User.findOne({ email: { $eq: email } });
    const userPayload = JSON.parse(JSON.stringify(existingUser));
    
    if (userPayload) {
        delete userPayload.password;
    }

    return userPayload;
}

async function register(email, fname, lname, password) {
    // Validate email before proceeding
    if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
    }

    const hash = await createPasswordHash(password);

    const newUser = new User({
        fname,
        lname,
        password: hash,
        email,
    });

    const userPayload = JSON.parse(JSON.stringify(newUser));
    if (userPayload) {
        delete userPayload.password;
    }

    await newUser.save();
    return userPayload;
}

async function login(email, password) {
    // Validate email before querying
    if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
    }

    const acc = await User.findOne({ email: { $eq: email } });

    if (!acc) {
        throw new Error('User not found');
    }

    const payload = await signToken(password, acc.password, { id: acc._id.toString(), email: email });

    return payload;
}

module.exports = {
    findUserById,
    register,
    login
};

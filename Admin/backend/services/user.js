const User = require("../models/user");
const { createPasswordHash, signToken, validatePassword } = require("./auth");

async function findUserById(email) {
    const existingUser = await User.findOne({ email });
    const userPayload = JSON.parse(JSON.stringify(existingUser));
    
    if (userPayload) {
        delete userPayload.password;
    }

    return userPayload;
}

async function register(email, fname, lname, password) {
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
    const acc = await User.findOne({ email });

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

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fname: String,
    lname: String,
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

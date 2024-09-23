const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for user action logs
const userActionLogSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const UserActionLog = mongoose.model('UserActionLog', userActionLogSchema);
module.exports = UserActionLog;

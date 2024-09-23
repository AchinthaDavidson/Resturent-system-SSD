const UserActionLog = require('../models/useractionLog'); // Assuming you have a UserActionLog model
const { verifyToken } = require('./auth'); // Assuming this utility verifies and decodes the token

// Function to log user actions
const logUserAction = async (token, message) => {
    try {
        const decodedToken = await verifyToken(token);
        const email = decodedToken.email;
        const timestamp = new Date();

        // Create log entry
        const logEntry = new UserActionLog({
            email,
            message,
            timestamp,
        });

        // Save the log to the database
        await logEntry.save();
        console.log(`User action logged: ${email} - ${message}`);
    } catch (error) {
        console.error('Error logging user action:', error);
    }
};

module.exports = { logUserAction };

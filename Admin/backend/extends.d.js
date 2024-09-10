// Since JavaScript doesn't have types, we simply omit the type definitions.

const IauthPayload = {
    id: String,
    email: String,
};

// Extending the Express Request object in JavaScript can be done using middleware.
// Here's an example of how you can attach a `user` object to the request in JavaScript:

// Middleware to add 'user' property to the Express request object
function addUserToRequest(req, res, next) {
    req.user = {
        id: "",   // You can add logic to populate these values as needed
        email: ""
    };
    next();
}

module.exports = { IauthPayload, addUserToRequest };

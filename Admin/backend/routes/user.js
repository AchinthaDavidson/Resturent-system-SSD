const { body } = require("express-validator");
const { authGurd, validate } = require("../utils/validator");
const { Router } = require("express");
const { currentUser, userLogin, userRegister } = require("../controllers/user");
const rateLimit = require('express-rate-limit');

// Rate limiting middleware for login and register routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window 
  message: "Too many login/register attempts from this IP, please try again after 15 minutes."
});

const userRouter = Router();

// Register route with rate limiting
userRouter.post("/register", authLimiter, validate([
  body("email").isEmail(),
  body("password").isLength({ min: 5 })
]), userRegister);

// Login route with rate limiting
userRouter.post("/login", authLimiter, validate([
  body("email").isEmail(),
  body("password").isLength({ min: 5 })
]), userLogin);

userRouter.get("/current-user", authGurd, currentUser);

module.exports = userRouter;

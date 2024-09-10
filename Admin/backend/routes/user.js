const { body } = require("express-validator");
const { authGurd, validate } = require("../utils/validator");
const { Router } = require("express");
const { currentUser, userLogin, userRegister } = require("../controllers/user");

const userRouter = Router();

userRouter.post("/register", validate([
  body("email").isEmail(),
  body("password").isLength({ min: 5 })
]), userRegister);

userRouter.post("/login", validate([
  body("email").isEmail(),
  body("password").isLength({ min: 5 })
]), userLogin);

userRouter.get("/current-user", authGurd, currentUser);

module.exports = userRouter;

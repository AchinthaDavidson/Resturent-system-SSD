require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const { MONGO_URL, PORT } = require("./src/configs/server");
const bcrypt = require("bcrypt");
const passport = require("passport");

require("./src/middlewares/passport.middleware");

const app = express();
const port = PORT;

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "*",
  })
);

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongoDB
// main().catch((err) => console.log(err));
// async function main() {
//   mongoose.set("strictQuery", false);
//   await mongoose.connect(MONGO_URL);
// }

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connect success!");
});

app.use("/auth", authRoutes);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoutes);

const foodRouter = require("./src/routes/food");
app.use("/food", foodRouter);

const faqRouter = require("./src/routes/faq");
app.use("/faq", faqRouter);

const menurout = require("./src/routes/menu");
app.use("/menu", menurout);


app.listen(port, () => {
  console.log(`server started in port ${port}`);
});

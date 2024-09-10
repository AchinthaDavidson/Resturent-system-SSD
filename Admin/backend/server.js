const express = require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const cors = require("cors");
const dotenv =require("dotenv");
require("dotenv").config();
mongoose.set('strictQuery', false);
const app=express();

const PORT= process.env.PORT||8070;

app.use(cors());
app.use(bodyParser.json());

const URL=process.env.MONGODB_URL;

mongoose.connect(URL, {
    
    useNewUrlParser: true
   
   
  })

const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("db connect success!");
})

const userRouter= require("./routes/user.js");
app.use("/user", userRouter);

const coustomerRouter= require("./routes/customer.js");
app.use("/customer", coustomerRouter);

const orderRouter= require("./routes/order.js");
app.use("/order", orderRouter);

const order_foodRouter= require("./routes/order_food.js");
app.use("/orderfood", order_foodRouter);

const foodRouter= require("./routes/food.js");
app.use("/food", foodRouter);

const waiterRouter= require("./routes/waiter.js");
app.use("/waiter", waiterRouter);

const driverRouter= require("./routes/driver.js");
app.use("/driver", driverRouter);

const ResMenu = require("./routes/menu.js");
app.use("/menu", ResMenu);

const ResRouter = require("./routes/restaurant.js");
app.use("/resInventory", ResRouter);

const InvtRouter = require("./routes/Inventoryfood.js");
app.use("/Inventoryfood", InvtRouter);

const barRouter = require("./routes/barinventory.js");
app.use("/BarInventory", barRouter);

const bardataRouter = require("./routes/barinventory_data.js");
app.use("/Bardata", bardataRouter);

// const dishHandler = require("./routes/dishhandler.js");
// app.use("/dishHandler",dishHandler);

const faqRouter = require("./routes/faq.js");
app.use("/faq", faqRouter);

const themapRouter = require("./routes/map.js");
app.use("/MAP", themapRouter);



app.listen(PORT,()=>{
    console.log('Sever is runing on port 8070')
})
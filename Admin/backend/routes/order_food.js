const router = require("express").Router();
// const { default: Order } = require("../../frontend/src/pages/Order/Order");
const order_food = require("../models/order_food");
// const Coustomer = require("../models/coustomer");
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: "Too many requests, please try again later."
});

// Apply rate limiter to all routes
router.use(apiLimiter);


// ADD order food
router.route("/add").post((req,res)=>{

    console.log("hi2");

    const order_id =req.body.order_id;
    const food_id   =req.body.description;
    const  qty  =req.body.quantity;
  


    const neworder_food =new  order_food({
        order_id,
       food_id,
       qty 
       
    })

    neworder_food.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})

// delete
router.route("/delete/:id/:fid").delete(async(req,res)=>{

    

    await order_food.deleteOne({order_id:req.params.id,food_id:req.params.fid,})

    .then(()=>{
            res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
            res.status(500).send({status:"error deleted"});
    })

})

router.route("/delete/:id").delete(async(req,res)=>{

    

    await order_food.deleteMany({order_id:req.params.id,})

    .then(()=>{
            res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
            res.status(500).send({status:"error deleted"});
    })

})
// show food

router.route("/findone/:id").get((req,res)=>{
    order_food.find({order_id:req.params.id}).then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports=router;
const router = require('express').Router();
const mongoose = require("mongoose");

//db schema and modelr
const dishSchema = mongoose.Schema({
    dishTitle : String,
    dishDescription : String,
    dishPrice : String

})

const Dish = mongoose.model("Dish", dishSchema);

router.route("/create").post(async(req,res)=>{

    console.log("create dish requested");

Dish.create({
    dishTitle: req.body.dishTitle,
    dishDescription : req.body.dishDescription,
    dishPrice : req.body.dishPrice 

})
    .then((doc)=> console.log(doc))
    .catch((err) => console.log(err));

console.log(req.body);
});



router.route("/viewDish").get(async(req,res)=>{

    console.log("view all dishes requested");

    Dish
        .find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err))
});


router.route("/delete/:id").delete(async(req,res)=>{

    console.log("delete dishes requested");

   Dish.findByIdAndDelete({_id:req.params.id})
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});


router.route("/update/:id").put(async(req,res)=>{

    console.log("update dishes requested");

    Dish.findByIdAndUpdate(
        {_id: req.params.id} ,{
            dishTitle : req.body.title,
            dishDescription : req.body.description,
            dishPrice : req.body.price       
    
    }
       ).then((doc) => console.log(doc))
        .catch((err) => console.log(err));
    
    });

module.exports = router;
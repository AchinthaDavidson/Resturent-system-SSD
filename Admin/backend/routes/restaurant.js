const router = require('express').Router();
const Inventoryfood = require('../models/Inventoryfood');
let Restaurant = require('../models/restaurant');  
let food=require('../models/food');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');  
const { body, validationResult } = require('express-validator');
const { authGurd } = require("../utils/validator");
const { logUserAction } = require('../services/userActionLogService'); 
// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: "Too many requests, please try again later."
});

// Apply rate limiter to all routes
router.use(apiLimiter);
router.use(authGurd)
function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

/* add */
router.route("/add").post((req,res)=>{

    const Item_Id = req.body.id;
    const Item_Name  = req.body.name;
    const Quantity =req.body.quantity;
    const Total_Cost = Number(req.body.totalCost);
    const Re_Order_Level = req.body.reorderlevel;
    const unit = req.body.unit;
    // const Item_Id = 'req.body.id';
    // const Item_Name  = 'req.body.name';
    // const Quantity = 'ddd';
    // const Total_Cost = 'req.body.totalCost';
    // const Re_Order_Level = 'req.body.reorderlevel';

    const newRes = new Restaurant({
        Item_Id,       
        Item_Name,             
        Quantity,        
        Total_Cost,             
        Re_Order_Level,  
        unit
    })

    newRes.save().then(async ()=>{
        const authToken = req.headers['authorization'].split('Bearer ')[1];
        await logUserAction(authToken, 'Added new inventory item');
        res.json("Items added");
    }).catch((err)=>{
        console.log(err);
    })
})

/* update */
router.route("/update/:id").put(async(req,res)=>{

    let Id = req.params.id;

    /*get data from body*/

    // const {Item_Name,Quantity,Total_Cost,Re_Order_Level} = req.body;
    // const Item_Name  = 'req.body.efg';
    // const Quantity = 'abc';
    // const Total_Cost = 'req.body.def';
    // const Re_Order_Level = 'req.body.ghi';
    // const unit = "req.body.unit";
    const Item_Name  = req.body.name;
    const Quantity =req.body.qty;
    const Total_Cost = Number(req.body.totalCost1);
    const Re_Order_Level = req.body.reorderlevel;
    const unit = req.body.unit;

    const updatebar = {Item_Name,Quantity,Total_Cost,Re_Order_Level,unit}  

    await Restaurant.updateOne({Item_Id:Id},{$set:updatebar})
    .then(()=>{
        res.status(200).send({status:"bar inventory updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"bar inventory update failed", error:err});
    })
})

 /*delete*/
// router.route("/delete/:id").delete(async(req,res)=>{
    
//     let Id = req.params.id;

//     await Inventoryfood.remove({Item_Id:Id}).then(()=>{
//         res.status(200).send({status:"Inventory details deleted", user : Id})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"Inventory details delete failed", error:err});
//     })
// })

/* display*/
router.route("/").get((req,res)=>{

    Restaurant.find().sort({Item_Name:-1}).then((restaurant)=>{
        res.json(restaurant)
    }).catch((err)=>{
        console.log(err);
    })
})

//  router.route("/update/:id").put(async (req, res) => {
  
//     let userId = req.params.id;
//     const Quantity =req.body.quantity;
//     const Total_Cost = req.body.totalCost;
//     const Re_Order_Level = req.body.reorderlevel;
//     const updateRestaurant = {Quantity,Total_Cost,Re_Order_Level};
//     const update = await Customer.updateOne({Item_Id:userId}, updateRestaurant)
     
//    .then(() => {
//        res.status(200).send({ status: "user update", user: update });
//      })
//      .catch((err) => {
//        console.log(err);
//      });
//  });

 
router.route("/update1/:id").post(async(req,res)=>{
   
    let Id = req.params.id;

    // const Quantity = 10;
    // const Total_Cost = 50;
   
    const Quantity =req.body.Quantity;
    const Total_Cost = req.body.cost;
    
     Restaurant.find({Item_Id:req.params.id}).then(async (Restaurant)=>{
        var  Quantity1 =Restaurant[0].Quantity
        var cost1 =Restaurant[0].Total_Cost

        update2(Quantity1,cost1)
        const authToken = req.headers['authorization'].split('Bearer ')[1];
        await logUserAction(authToken, 'Added new inventory item');
    }).catch((err)=>{
        console.log(err)
    })

    

    function update2(qty,cost3){
       var Quantity3=Number(qty-Quantity)
        var Total_Cost3=Number(cost3-Total_Cost)

        Restaurant.updateOne({Item_Id:Id},{$set:{Quantity:Quantity3,Total_Cost:Total_Cost3}})

        .then(()=>{
            res.status(200).send({status:"bar inventory updated"})
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"bar inventory update failed", error:err});
        })
        
    }
    
})

router.route("/updateqty").post(async (req, res) => {
    const Id = req.body.list;

    // Validate each ID before using it in a query
    for (let i = 0; i < Id.length; i++) {
        if (!isValidObjectId(Id[i].Iid)) {
            return res.status(400).json({ error: `Invalid ID format for Iid: ${Id[i].Iid}` });
        }
    }

    for (let i = 0; i < Id.length; i++) {
        food.findById(Id[i].Iid).then((food) => {
            if (!food) {
                return res.status(404).json({ error: `Food item not found for Iid: ${Id[i].Iid}` });
            }

            const Ingridients = food.Ingridients;

            Ingridient(Ingridients, Id[i].quantity);
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "Database query failed" });
        });
    }

    function Ingridient(Ingridients, count) {
        for (let i = 0; i < Ingridients.length; i++) {
            if (!isValidObjectId(Ingridients[i].id)) {
                return res.status(400).json({ error: `Invalid ID format for ingredient: ${Ingridients[i].id}` });
            }

            Restaurant.findById(Ingridients[i].id).then((Restaurant) => {
                if (!Restaurant) {
                    return res.status(404).json({ error: `Restaurant item not found for ID: ${Ingridients[i].id}` });
                }

                const Quantity1 = Restaurant.Quantity;
                update2(Quantity1, Ingridients[i].quantity, Ingridients[i].id, count);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    function update2(qty, Quantity, id, count) {
        var Quantity3 = qty - (Quantity * count);

        Restaurant.updateOne({ _id: id }, { $set: { Quantity: Quantity3 } })
            .then(() => {
                console.log("Inventory updated");
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ status: "Inventory update failed", error: err });
            });
    }
});




router.route("/findone/:id").post((req,res)=>{
    Restaurant.find({Item_Id:req.params.id}).then((Restaurant)=>{
        res.json(Restaurant)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/sum").get((req,res)=>{
    
    Restaurant.aggregate([{$group:{_id:null ,price:{$sum:"$Total_Cost" }}}]).then((Restaurant)=>{
                res.json(Restaurant)
            }).catch((err)=>{
                console.log(err)
            })
        })



 module.exports = router;

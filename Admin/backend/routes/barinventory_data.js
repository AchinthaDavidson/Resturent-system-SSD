const router = require('express').Router();
const barInv = require('../models/barinventory_data');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: "Too many requests, please try again later."
});

// Apply rate limiter to all routes
router.use(apiLimiter);

/* add */
router.route("/add").post((req,res)=>{
    const d = new Date();
    const Product_Code = req.body.code;
    const Quantity = Number(req.body.quantity);
    const Expire_Date = req.body.Expiredate;
    const Unit_Cost = Number(req.body.Unitcost);
    const Sell_Price = req.body.Sellprice;
    const Buy_Date = d.getDate() +"-" + (d.getMonth() + 1) +"-" +d.getFullYear() ;
    const time=d.getHours() + ":" + d.getMinutes() 

    // const Product_Code = 'req.body.code';
    // const Quantity = 'req.body.quantity';
    // const Expire_Date = 'req.body.Expiredate';
    // const Unit_Cost = 'req.body.Unitcost';
    // const Sell_Price = 'req.body.Sellprice';
    // const Buy_Date = 'req.body.Buydate';

    const newbar = new barInv({
        Product_Code,
        Quantity,
        Expire_Date,
        Unit_Cost,
        Sell_Price,
        Buy_Date,
        time
    })

    newbar.save().then(()=>{
        res.json("Bottle added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    barInv.aggregate([{$group:{_id:"$Product_Code",price:{$min:"$Sell_Price"}}}]).then((bars)=>{
        res.json(bars)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/find/:id").get((req,res)=>{
    let id = req.params.id;
    barInv.find({Product_Code:id}).then((barInv)=>{
        res.json(barInv)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    await barInv.deleteOne({_id:req.params.id})
    .then(()=>{
        res.status(200).send({status:"bar inventory_data deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"bar inventory_data delete failed"});
    })
})

/* display*/

// router.route("/viewbarInventory").get((req,res)=>{
// })

router.route("/sum/:id").get((req,res)=>{
    let id=req.params.id
    barInv.aggregate([{$match:{Buy_Date:{$regex :id}}},{$group:{_id:null ,price:{$sum: { $multiply: ["$Quantity","$Unit_Cost"]}}}}]).then((barInv)=>{
                res.json(barInv)
            }).catch((err)=>{
                console.log(err)
            })
        })

module.exports = router;
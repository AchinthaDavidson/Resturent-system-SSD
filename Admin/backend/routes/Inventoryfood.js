const router = require('express').Router();
let Inventoryfood = require('../models/Inventoryfood');
const rateLimit = require('express-rate-limit');
const { authGurd } = require("../utils/validator");
const { logUserAction } = require('../services/userActionLogService');

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: "Too many requests, please try again later."
});

// Apply rate limiter to all routes
// router.use(apiLimiter);
// router.use(authGurd)

/*add*/
router.route("/add").post((req,res)=>{
    const d = new Date();
    const Item_Id = req.body.id;
    const Quantity =Number(req.body.quantity);
    const Unit_Price = Number(req.body.unitPrice);
    const Supplier = req.body.supplier; 
    const Expire_Date   = req.body.expiredate;
    const date =  d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
    const time = d.getHours()+":"+d.getMinutes();

    // const Item_Id = 'req.body.id';
    // const Quantity = 'ddd';
    // const Unit_Price = 'dd';
    // const Supplier = 'req.body.supplier'; 
    // const Expire_Date   = 'req.body.expiredate';
    // const date = d.getUTCDate()+"/"+d.getUTCMonth()+1+"/"+d.getFullYear();
    // const time = d.getHours()+":"+d.getMinutes();
    
    const newRes = new Inventoryfood({
        Item_Id,               
        Quantity,      
        Unit_Price,  
        Supplier, 
        Expire_Date,              
        date,  
        time, 
    })

    newRes.save().then(async ()=>{
        const authToken = req.headers['authorization'].split('Bearer ')[1];
        await logUserAction(authToken, 'Added new inventory item');
        res.json("Items added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/find/:id").get((req,res)=>{

    let Id = req.params.id;
    Inventoryfood.find({Item_Id:Id}).then((Inventoryfood)=>{
        res.json(Inventoryfood)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
await Inventoryfood.deleteOne({_id:req.params.id})

    .then(async ()=>{
        const authToken = req.headers['authorization'].split('Bearer ')[1];
        await logUserAction(authToken, `Deleted inventory item with ID: ${req.params.id}`);
            res.status(200).send({status:"user deleted"});
    }).catch((err)=>{
            res.status(500).send({status:"error deleted"});
    })

})


router.route("/sum/:id").get((req,res)=>{
    let id=req.params.id
    Inventoryfood.aggregate([{$match:{date:{$regex :id}}},{$group:{_id:null ,price:{$sum: { $multiply: ["$Quantity","$Unit_Price"]}}}}]).then((orders)=>{
                res.json(orders)
            }).catch((err)=>{
                console.log(err)
            })
        })
module.exports = router;

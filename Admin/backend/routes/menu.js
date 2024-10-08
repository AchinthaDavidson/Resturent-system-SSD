const router = require('express').Router();
let Menu = require('../models/menu');
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
router.use(apiLimiter);
router.use(authGurd)
/*add*/
router.route("/add").post((req,res)=>{

    const category_Id = req.body.id;
    const Name  = req.body.name;

    // const category_Id = 'req.body.id';
    // const Name  = 'req.body.name';
    // const Image  = 'req.body.image'; 

    const newMenu = new Menu({
        category_Id,       
        Name,                      
    })

    newMenu.save().then(async ()=>{
        const authToken = req.headers['authorization'].split('Bearer ')[1];
        await logUserAction(authToken, 'Added new menu');
        res.json("Product added");
    }).catch((err)=>{
        console.log(err);
    })
})

/* update */
router.route("/update/:id").put(async(req,res)=>{

    let Id = req.params.id;

    /*get data from body*/

    // const {Item_Name,Quantity,Total_Cost,Re_Order_Level} = req.body;
    // const category_Id  = 'req.body.efg';
    // const Name = 'abc';

   
    const Name  = req.body.name;

    const updatemenu = {Name};  

    await Menu.updateOne({category_Id:Id},{$set:updatemenu})
    .then(()=>{
        res.status(200).send({status:"categories updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"catogories update failed", error:err});
    })
})

/*display*/
router.route("/").get((req,res)=>{

    Menu.find().sort({category_Id:1}).then((menu)=>{
        res.json(menu)
    }).catch((err)=>{
        console.log(err);
    })
})

/*delete*/
router.route("/delete/:id").delete(async(req,res)=>{
    
    let Id = req.params.id;

    await Menu.deleteOne({category_Id:req.params.id}).then(async ()=>{
        const authToken = req.headers['authorization'].split('Bearer ')[1];
        await logUserAction(authToken, 'delete menu');
        res.status(200).send({status:"Menu details deleted", user : Id})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Menu details delete failed", error:err});
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Bar = require('../models/barinventory');
const barInv = require('../models/barinventory_data');
const rateLimit = require('express-rate-limit');
const { body, validationResult, param } = require('express-validator');
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
/* add */
router.route("/add").post(
    [
        body('code').isAlphanumeric().withMessage('Product code should be alphanumeric'),
        body('name').isString().withMessage('Product name should be a string'),
        body('type').isString().withMessage('Product type should be a string'),
        body('catogary').isString().withMessage('Category should be a string'),
        body('quantity').isInt({ min: 1 }).withMessage('Quantity should be a positive integer'),
        body('newTotCost').isFloat({ min: 0 }).withMessage('Total cost should be a valid number'),
        body('Reorderlevel').isInt({ min: 0 }).withMessage('Reorder level should be a non-negative integer'),
        body('Location').isURL().optional().withMessage('Image URL should be valid'),
    ],
    (req, res) => {
        console.log("add method called");

        // Check validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            code, 
            name, 
            type, 
            catogary, 
            quantity, 
            newTotCost, 
            Reorderlevel, 
            Location } 
            = req.body;

        const newbar = new Bar({
            Product_Code: code,
            Product_Name: name,
            Product_Type: type,
            Catogary: catogary,
            Quantity: quantity,
            Total_Cost: Number(newTotCost),
            Re_Order_Level: Reorderlevel,
            ImageURL: Location
        });

        newbar.save().then(async () => {
            const authToken = req.headers['authorization'].split('Bearer ')[1];
            await logUserAction(authToken, 'Added new bar item');
            res.json("Bottle added");
        }).catch((err) => {
            console.log(err);
        });
    });

/* update */
router.route("/update/:id").put(
    [
        param('id').isAlphanumeric().withMessage('ID should be alphanumeric'),
        body('name').isString().withMessage('Product name should be a string'),
        body('type').isString().withMessage('Product type should be a string'),
        body('catogary').isString().withMessage('Category should be a string'),
        body('quantity2').isInt({ min: 0 }).withMessage('Quantity should be a non-negative integer'),
        body('Totalcost2').isFloat({ min: 0 }).withMessage('Total cost should be a valid number'),
        body('Reorderlevel').isInt({ min: 0 }).withMessage('Reorder level should be a non-negative integer'),
    ],
    async (req, res) => {
        // Check validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let userid = req.params.id;

        const { name, type, catogary, quantity2, Totalcost2, Reorderlevel } = req.body;

        const updatebar = {
            Product_Name: name,
            Product_Type: type,
            Catogary: catogary,
            Quantity: quantity2,
            Total_Cost: Number(Totalcost2),
            Re_Order_Level: Reorderlevel
        };

        await Bar.updateOne({ Product_Code: userid }, { $set: updatebar })
            .then(async () => {
                const authToken = req.headers['authorization'].split('Bearer ')[1];
                await logUserAction(authToken, 'Update bar item');
                res.status(200).send({ status: "bar inventory updated" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ status: "bar inventory update failed", error: err });
            });
    });
    router.route("/").get((req,res)=>{

        Bar.find().sort({Product_Name:1}).then((bars)=>{
            res.json(bars)
        }).catch((err)=>{
            console.log(err);
        })
    })
    router.route("/sum/").get((req,res)=>{
   
        Bar.aggregate([{$group:{_id:null ,price:{$sum: "$Total_Cost"}}}]).then((Bar)=>{
                    res.json(Bar)
                }).catch((err)=>{
                    console.log(err)
                })
            })
    
/* update by quantity */
router.route("/updateqty").post(
    [
        body('list').isArray().withMessage('List should be an array of items'),
        body('list.*.description').isAlphanumeric().withMessage('Product description should be alphanumeric'),
        body('list.*.quantity').isInt({ min: 0 }).withMessage('Quantity should be a non-negative integer')
    ],
    async (req, res) => {
        const { list } = req.body;
        console.log("update");
        console.log(list);

        // Iterate over the list
        for (let i = 0; i < list.length; i++) {
            Bar.find({ Product_Code: { $eq: list[i].description } }).then((Bar) => {
                const Quantity1 = Bar[0].Quantity;

                update2(Quantity1, list[i].quantity, list[i].description);
                console.log(Quantity1);
            }).catch((err) => {
                console.log(err);
            });
        }

        function update2(qty, Quantity, id) {
            var Quantity3 = Number(qty - Quantity);

            Bar.updateOne({ Product_Code: id }, { $set: { Quantity: Quantity3 } })
                .then(async () => {
                    console.log("Inventory updated");
                    const authToken = req.headers['authorization'].split('Bearer ')[1];
                    await logUserAction(authToken, 'update bar data');
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({ status: "bar inventory update failed", error: err });
                });
        }
    });

module.exports = router;

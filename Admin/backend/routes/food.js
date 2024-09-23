const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const food = require("../models/food");
const order = require("../models/order");
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
/* Create new dish */
router.route("/create").post(
    [
        body('dishTitle').isString().trim().escape().withMessage('Title must be a valid string.'),
        body('dishDescription').isString().trim().escape().withMessage('Description must be a valid string.'),
        body('dishIngridients').isArray().withMessage('Ingredients must be an array.'),
        body('dishPrice').isFloat({ min: 0 }).withMessage('Price must be a positive number.'),
        body('ImageURL').isURL().optional().withMessage('Image URL must be a valid URL.'),
        body('dishCategory').isString().trim().escape().withMessage('Category must be a valid string.')
    ],
    (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const Name = req.body.dishTitle;
        const Cat_id = Math.floor(Math.random() * (9999 - 0) + 0);
        const Description = req.body.dishDescription;
        const Ingridients = req.body.dishIngridients;
        const Price = req.body.dishPrice;
        const Picture = "Still pending";
        const ImageURL = req.body.ImageURL;
        const Category = req.body.dishCategory;

        const newfood = new food({
            Name,
            Cat_id,
            Ingridients,
            Price,
            Picture,
            Description,
            ImageURL,
            Category
        });

        newfood.save().then(async () => {
            const authToken = req.headers['authorization'].split('Bearer ')[1];
            await logUserAction(authToken, 'Added nefood');
            res.status(200).json({ message: "Dish created successfully" });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error saving dish" });
        });
    });

/* Get all dishes */
router.route("/").get((req, res) => {
    food.find().then((food) => {
        res.json(food);
    }).catch((err) => {
        console.log(err);
    });
});

/* View dishes */
router.route("/viewDish").get(async (req, res) => {
    food.find().then((items) => res.json(items)).catch((err) => console.log(err));
});

/* Count dishes */
router.route("/count").get((req, res) => {
    food.count().then((food) => {
        res.json(food);
    }).catch((err) => {
        console.log(err);
    });
});

/* Delete dish */
router.route("/delete/:id").delete(async (req, res) => {
    food.findByIdAndDelete({ _id: req.params.id })
        .then((doc) => {
            res.status(200).json({ message: "Dish deleted successfully", doc });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting dish" });
        });
});

/* Update dish */
router.route("/update/:id").put(
    [
        body('title').isString().trim().escape().withMessage('Title must be a valid string.'),
        body('description').isString().trim().escape().withMessage('Description must be a valid string.'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number.')
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Proceed with updating if no errors
        food.findByIdAndUpdate(
            { _id: req.params.id },
            {
                Name: req.body.title,
                Description: req.body.description,
                Price: req.body.price
            }
        )
        .then(async (doc) => {
            const authToken = req.headers['authorization'].split('Bearer ')[1];
            await logUserAction(authToken,'update  item');
            res.status(200).json({ message: "Dish updated successfully", doc });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error updating dish" });
        });
    }
);

module.exports = router;
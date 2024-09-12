const express = require("express");
const router = express.Router();
const driver = require("../models/driver");
const { body, param, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

router.use(apiLimiter);

// Create Driver
router.route("/add").post(
    [
        body('id').isString().trim().escape(),
        body('name').isString().trim().isLength({ min: 1 }).withMessage('Name is required'),
        body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
        body('address').isString().trim().isLength({ min: 1 }).withMessage('Address is required'),
        body('phone_no').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits').isNumeric(),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}/).withMessage('Password must contain letters, numbers, and special characters')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, name, email, address, phone_no, password } = req.body;

        const newDriver = new driver({
            D_Id: id,
            name,
            Email: email,
            address,
            phone_no,
            password
        });

        newDriver.save()
            .then(() => res.json("Details saved"))
            .catch((err) => {
                console.log(err);
                res.status(500).send("Error saving details");
            });
    }
);

// Read Drivers
router.route("/").get((req, res) => {
    driver.find()
        .then((drivers) => res.json(drivers))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching drivers");
        });
});

// Update Driver
router.put("/update/:id",
    [
        param('id').isMongoId().withMessage('Invalid ID format'),
        body('name').optional().isString().trim().isLength({ min: 1 }).withMessage('Name is required'),
        body('Email').optional().isEmail().normalizeEmail().withMessage('Invalid email format'),
        body('address').optional().isString().trim().isLength({ min: 1 }).withMessage('Address is required'),
        body('phone_no').optional().isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits').isNumeric(),
        body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}/).withMessage('Password must contain letters, numbers, and special characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userID = req.params.id;
        const { name, Email, address, phone_no, password } = req.body;

        try {
            // Find the document by ID
            const driverItem = await driver.findById(userID);
            if (!driverItem) {
                return res.status(404).send({ status: "Driver not found" });
            }

            // Apply updates
            if (name) driverItem.name = name;
            if (Email) driverItem.Email = Email;
            if (address) driverItem.address = address;
            if (phone_no) driverItem.phone_no = phone_no;
            if (password) driverItem.password = password;

            // Save the updated document
            await driverItem.save();
            res.status(200).send({ status: "Driver updated" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "Error updating driver", error: err.message });
        }
    }
);

// Delete Driver
router.delete('/delete/:id',
    [
        param('id').isMongoId().withMessage('Invalid ID format')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userID = req.params.id;

        try {
            await driver.findByIdAndDelete(userID);
            res.status(200).send({ status: "Driver deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "Error deleting driver", error: err.message });
        }
    }
);

// Get Driver by ID
router.route("/:id").get(
    [
        param('id').isMongoId().withMessage('Invalid ID format')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        driver.findById(id)
            .then((driverItem) => res.json(driverItem))
            .catch((err) => {
                console.log(err);
                res.status(500).send("Error fetching driver");
            });
    }
);

module.exports = router;
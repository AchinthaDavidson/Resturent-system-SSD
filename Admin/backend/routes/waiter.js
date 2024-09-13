const express = require("express");
const router = express.Router();
const waiter = require("../models/waiter");
const { body, param, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

router.use(apiLimiter);

// Create Waiter
router.route("/add").post(
    [
        body('id').isString().trim().escape(),
        body('name').isString().trim().isLength({ min: 1 }).withMessage('Name is required'),
        body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
        body('address').isString().trim().isLength({ min: 1 }).withMessage('Address is required'),
        body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits').isNumeric(),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}/).withMessage('Password must contain letters, numbers, and special characters'),
        body('status').isString().trim().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, name, email, address, phone, password, status } = req.body;

        const newWaiter = new waiter({
            W_Id: id,
            name,
            Email: email,
            address,
            phone_no: phone,
            password,
            status
        });

        newWaiter.save()
            .then(() => res.json("Details saved"))
            .catch((err) => {
                console.log(err);
                res.status(500).send("Error saving details");
            });
    }
);

// Read Waiters
router.route("/").get((req, res) => {
    waiter.find()
        .then((waiters) => res.json(waiters))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching waiters");
        });
});

// Update Waiter
router.put("/update/:id",
    [
        param('id').isMongoId().withMessage('Invalid ID format'),
        body('W_Id').optional().isString().trim().escape(),
        body('name').optional().isString().trim().isLength({ min: 1 }).withMessage('Name is required'),
        body('Email').optional().isEmail().normalizeEmail().withMessage('Invalid email format'),
        body('address').optional().isString().trim().isLength({ min: 1 }).withMessage('Address is required'),
        body('phone_no').optional().isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits').isNumeric(),
        body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}/).withMessage('Password must contain letters, numbers, and special characters'),
        body('status').optional().isString().trim().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userID = req.params.id;
        const { W_Id, name, Email, address, phone_no, password, status } = req.body;

        try {
            // Find the document by ID
            const waiterItem = await waiter.findById(userID);
            if (!waiterItem) {
                return res.status(404).send({ status: "Waiter not found" });
            }

            // Apply updates
            if (W_Id) waiterItem.W_Id = W_Id;
            if (name) waiterItem.name = name;
            if (Email) waiterItem.Email = Email;
            if (address) waiterItem.address = address;
            if (phone_no) waiterItem.phone_no = phone_no;
            if (password) waiterItem.password = password;
            if (status) waiterItem.status = status;

            // Save the updated document
            await waiterItem.save();
            res.status(200).send({ status: "Waiter updated" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "Error updating waiter", error: err.message });
        }
    }
);

// Delete Waiter
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
            await waiter.findByIdAndDelete(userID);
            res.status(200).send({ status: "Waiter deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "Error deleting waiter", error: err.message });
        }
    }
);

// Get Waiter by ID
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

        waiter.findById(id)
            .then((waiterItem) => res.json(waiterItem))
            .catch((err) => {
                console.log(err);
                res.status(500).send("Error fetching waiter");
            });
    }
);

module.exports = router;
const express = require("express");
const router = express.Router();
const faq = require("../models/faq");
const { body, param, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { authGurd } = require("../utils/validator");
const { logUserAction } = require('../services/userActionLogService'); 
// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

router.use(apiLimiter);
router.use(authGurd)
// Create FAQ
router.route("/add").post(
    [
        body('category').isString().trim().escape(),
        body('question').isString().trim().escape(),
        body('answer').isString().trim().escape()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { category, question, answer } = req.body;

        const newFaq = new faq({
            category,
            question,
            answer
        });

        newFaq.save()
            .then(async () =>{   const authToken = req.headers['authorization'].split('Bearer ')[1];
                await logUserAction(authToken, 'Added new faq');
                 res.json("New FAQ added")})
            .catch((err) => {
                console.log(err);
                res.status(500).send("Error adding FAQ");
            });
    }
);

// Read FAQs
router.route("/").get((req, res) => {
    faq.find()
        .then((faqs) => res.json(faqs))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching FAQs");
        });
});

// Update FAQ
router.route("/update/:id").put(
    [
        param('id').isMongoId(),
        body('category').optional().isString().trim().escape(),
        body('question').optional().isString().trim().escape(),
        body('answer').optional().isString().trim().escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const fId = req.params.id;
        const { category, question, answer } = req.body;

        try {
            // Find the document by ID
            const faqItem = await faq.findById(fId);
            if (!faqItem) {
                return res.status(404).send({ status: "FAQ not found" });
            }

            // Apply updates
            if (category) faqItem.category = category;
            if (question) faqItem.question = question;
            if (answer) faqItem.answer = answer;

            // Save the updated document
            await faqItem.save();
            const authToken = req.headers['authorization'].split('Bearer ')[1];
            await logUserAction(authToken, 'update faq');
            res.status(200).send({ status: "FAQ updated" });
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "Failed to update FAQ" });
        }
    }
);

// Delete FAQ
router.route("/delete/:id").delete(
    [
        param('id').isMongoId()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const fid = req.params.id;

        try {
            await faq.findByIdAndDelete(fid);
            const authToken = req.headers['authorization'].split('Bearer ')[1];
            await logUserAction(authToken, 'delete');
            res.status(200).send({ status: "FAQ deleted" });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ status: "Failed to delete FAQ" });
        }
    }
);

module.exports = router;
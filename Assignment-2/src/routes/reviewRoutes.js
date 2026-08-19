const express = require('express');
const router = express.Router();
const validationMiddleware = require('../middleware/validationMiddleware');
const {
  createReviewSchema,
  getReviewsSchema,
  reviewIdSchema,
  updateReviewSchema
} = require('../validationSchema/reviewValidationSchema');

// Dummy controller handlers (test karne ke liye)
const createReview = (req, res) => res.status(201).json({ message: "Review Created", data: req.body });
const getReviews = (req, res) => res.status(200).json({ message: "Reviews Fetched", query: req.query });
const updateReview = (req, res) => res.status(200).json({ message: "Review Updated", params: req.params, body: req.body });

// Route bindings
router.post('/createReview', validationMiddleware(createReviewSchema, 'body'), createReview);
router.get('/getReviews', validationMiddleware(getReviewsSchema, 'query'), getReviews);
router.patch('/updateReview/:id', validationMiddleware(reviewIdSchema, 'params'), validationMiddleware(updateReviewSchema, 'body'), updateReview);

module.exports = router;
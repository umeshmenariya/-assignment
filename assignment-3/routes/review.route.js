const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");

router.post("/createReview", reviewController.createReviewHandler);
router.get("/getReviews", reviewController.getReviewsHandler);

module.exports = router;
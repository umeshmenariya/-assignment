const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const { validateReviewId, validateCreateReview, validateUpdateReview } = require("../validation/reviewValidation");

router.post("/createReview", validateCreateReview, reviewController.createReviewHandler);
router.get("/getReviews", reviewController.getReviewsHandler);
router.get("/getSingleReview/:id", validateReviewId, reviewController.getSingleReviewHandler);
router.patch("/updateReview/:id", validateReviewId, validateUpdateReview, reviewController.updateReviewHandler);
router.delete("/deleteReview/:id", validateReviewId, reviewController.deleteReviewHandler);
router.patch("/:id/approve", validateReviewId, reviewController.approveReviewHandler);

module.exports = router;

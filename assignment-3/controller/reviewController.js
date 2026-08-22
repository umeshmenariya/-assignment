const reviewService = require("../service/reviewService");

const createReviewHandler = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    return res.status(201).json({ success: true, message: "Review created successfully", data: review });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

const getReviewsHandler = async (req, res) => {
  try {
    const data = await reviewService.getReviews(req.query);
    return res.status(200).json({ success: true, message: "Reviews fetched successfully", data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createReviewHandler, getReviewsHandler };
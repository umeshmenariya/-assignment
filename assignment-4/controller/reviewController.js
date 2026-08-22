const reviewService = require("../service/reviewService");

const createReviewHandler = async (req, res) => {
  try {
    const data = await reviewService.createReview(req.body);
    return res.status(201).json({ success: true, message: "Review created successfully", data });
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

const getSingleReviewHandler = async (req, res) => {
  try {
    const data = await reviewService.getReviewById(req.params.id);
    return res.status(200).json({ success: true, message: "Review fetched successfully", data });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

const updateReviewHandler = async (req, res) => {
  try {
    const data = await reviewService.updateReview(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Review updated successfully", data });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

const deleteReviewHandler = async (req, res) => {
  try {
    const data = await reviewService.deleteReview(req.params.id);
    return res.status(200).json({ success: true, message: "Review deleted successfully", data });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

const approveReviewHandler = async (req, res) => {
  try {
    const data = await reviewService.approveReview(req.params.id);
    return res.status(200).json({ success: true, message: "Review approved successfully", data });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createReviewHandler,
  getReviewsHandler,
  getSingleReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
  approveReviewHandler,
};

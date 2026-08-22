const mongoose = require("mongoose");

const validateReviewId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Review ID format" });
  }
  next();
};

const validateCreateReview = (req, res, next) => {
  const { title, comment, rating, reviewerName } = req.body;
  if (!title || !comment || !rating || !reviewerName) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
  }
  next();
};

const validateUpdateReview = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: "Request body cannot be empty" });
  }
  if (req.body.rating && (req.body.rating < 1 || req.body.rating > 5)) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
  }
  next();
};

module.exports = { validateReviewId, validateCreateReview, validateUpdateReview };

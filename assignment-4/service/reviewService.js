const ReviewModel = require("../../src/model/reviewModel");

const createReview = async (data) => {
  const { reviewerName, title } = data;
  const alreadyReviewed = await ReviewModel.findOne({ reviewerName, title });
  if (alreadyReviewed) {
    const error = new Error("aap ye review pehle de chuke ho");
    error.statusCode = 409;
    throw error;
  }
  return await ReviewModel.create(data);
};

const getReviews = async (queryParams) => {
  const { status, minRating, page = 1, limit = 10 } = queryParams;
  const filter = {};
  if (status) filter.status = status;
  if (minRating) filter.rating = { $gte: Number(minRating) };

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const [reviews, total] = await Promise.all([
    ReviewModel.find(filter).skip(skip).limit(limitNum),
    ReviewModel.countDocuments(filter),
  ]);

  return {
    reviews,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 1,
  };
};

const getReviewById = async (id) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }
  return review;
};

const updateReview = async (id, updateData) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  Object.assign(review, updateData);
  return await review.save();
};

const deleteReview = async (id) => {
  const deletedReview = await ReviewModel.findByIdAndDelete(id);
  if (!deletedReview) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }
  return deletedReview;
};

const approveReview = async (id) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }
  if (review.status === "approved") {
    const error = new Error("Review is already approved");
    error.statusCode = 400;
    throw error;
  }
  review.status = "approved";
  return await review.save();
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  approveReview,
};

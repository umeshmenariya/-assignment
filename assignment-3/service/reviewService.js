const ReviewModel = require("../../src/model/reviewModel"); /

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
  const { status, page = 1, limit = 10, sortBy } = queryParams;
  const filter = {};
  if (status) filter.status = status;

  let sortOption = {};
  if (sortBy) {
    const [field, order] = sortBy.split(":");
    if (["rating", "createdAt"].includes(field)) {
      sortOption[field] = order === "desc" ? -1 : 1;
    }
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const [reviews, total] = await Promise.all([
    ReviewModel.find(filter).sort(sortOption).skip(skip).limit(limitNum),
    ReviewModel.countDocuments(filter),
  ]);

  return {
    reviews,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 1,
  };
};

module.exports = { createReview, getReviews };
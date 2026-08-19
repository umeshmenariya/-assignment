const Joi = require('joi');

// 1. Ye POST /createReview API ke request body ke liye hai
const createReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80).required().messages({
    'string.empty': 'Title khali nahi ho sakta',
    'string.min': 'Title kam se kam 3 characters ka hona chahiye',
    'string.max': 'Title 80 characters se zyada nahi ho sakta',
    'any.required': 'Title dena zaroori hai'
  }),
  comment: Joi.string().trim().min(10).max(500).required().messages({
    'string.empty': 'Comment khali nahi ho sakta',
    'string.min': 'Comment kam se kam 10 characters ka hona chahiye',
    'string.max': 'Comment 500 characters se zyada nahi ho sakta',
    'any.required': 'Comment likhna zaroori hai'
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Rating ek number honi chahiye',
    'number.integer': 'Rating decimal nahi, whole number honi chahiye',
    'number.min': 'Rating kam se kam 1 honi chahiye',
    'number.max': 'Rating 5 se zyada nahi ho sakti',
    'any.required': 'Rating dena zaroori hai'
  }),
  reviewerName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Reviewer ka naam khali nahi ho sakta',
    'string.min': 'Naam kam se kam 2 characters ka hona chahiye',
    'string.max': 'Naam 50 characters se zyada nahi ho sakta',
    'any.required': 'Reviewer name dena zaroori hai'
  })
});

// 2. Ye GET /getReviews API ke query parameters ke liye hai (Bonus included)
const getReviewsSchema = Joi.object({
  status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
  minRating: Joi.number().min(1).max(5).optional(),
  maxRating: Joi.number().min(1).max(5).greater(Joi.ref('minRating')).optional().messages({
    'number.greater': 'maxRating hamesha minRating se bada hona chahiye'
  }),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(20).default(10)
});

// 3. Ye Review ID validate karne ke liye hai (Params: 24 char hex)
const reviewIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid MongoDB ObjectId format',
    'string.length': 'ID bilkul 24 characters ki honi chahiye',
    'any.required': 'Review ID zaroori hai'
  })
});

// 4. Ye PATCH /updateReview/:id API ke body ke liye hai (Partial Update)
const updateReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80),
  comment: Joi.string().trim().min(10).max(500),
  rating: Joi.number().integer().min(1).max(5),
  reviewerName: Joi.string().trim().min(2).max(50)
}).min(1).messages({
  'object.min': 'Update karne ke liye kam se kam 1 field bhejna zaroori hai'
});

module.exports = {
  createReviewSchema,
  getReviewsSchema,
  reviewIdSchema,
  updateReviewSchema
};
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Path `title` is required. Please provide a title."], // Custom error message
    minLength: [3, "Title kam se kam 3 characters ka hona chahiye"],
    maxLength: [80, "Title 80 characters se zyada nahi ho sakta"],
    trim: true
  },
  comment: {
    type: String,
    required: [true, "Comment likhna zaroori hai"],
    minLength: [10, "Comment kam se kam 10 characters ka hona chahiye"],
    maxLength: [500, "Comment 500 characters se bada nahi ho sakta"],
    trim: true,
    validate: {
      // Bonus: Khali space wali string reject karne ke liye custom validator
      validator: function(v) {
        return v.trim().length > 0;
      },
      message: "Comment sirf khali spaces ka nahi ho sakta"
    }
  },
  rating: {
    type: Number,
    required: [true, "Rating dena zaroori hai"],
    min: [1, "Rating kam se kam 1 honi chahiye"],
    max: [5, "Rating 5 se zyada nahi ho sakti"],
    validate: {
      // Custom validator to ensure whole numbers
      validator: Number.isInteger,
      message: "Rating sirf whole number honi chahiye (jaise 1, 2, 3), decimals (3.5) allowed nahi hain."
    }
  },
  reviewerName: {
    type: String,
    required: [true, "Reviewer ka naam dena zaroori hai"],
    minLength: [2, "Naam kam se kam 2 characters ka hona chahiye"],
    maxLength: [50, "Naam 50 characters se zyada nahi ho sakta"],
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "approved", "rejected"],
      message: "{VALUE} is not a valid status" // Custom enum error message
    },
    default: "pending"
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  // Bonus: helpfulCount field
  helpfulCount: {
    type: Number,
    default: 0,
    min: [0, "Helpful count negative nahi ho sakta"]
  }
}, { 
  timestamps: true // Ye createdAt aur updatedAt automatically add kar dega
});

// Model Export karna
module.exports = mongoose.model("Review", reviewSchema);
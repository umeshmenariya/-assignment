const mongoose = require('mongoose');
const Review = require('./model/reviewModel');

async function testSchema() {
  try {
    await mongoose.connect('mongodb://localhost:27017/assignmentTest');
    console.log("Connected to MongoDB");

    // Case 1: Valid data -> Save hona chahiye
    const validReview = await Review.create({
      title: "Bahut accha product",
      comment: "Delivery fast thi aur quality bhi acchi hai",
      rating: 5,
      reviewerName: "Rahul"
    });
    console.log("✅ Case 1 Passed: Sahi data save ho gaya!");

    // Case 2: Rating = 6 -> Fail hona chahiye
    try {
      await Review.create({
        title: "Test Rating Max",
        comment: "Ye fail hona chahiye",
        rating: 6,
        reviewerName: "Rahul"
      });
    } catch (err) {
      console.log("✅ Case 2 Passed (Rating > 5 blocked):", err.message);
    }

    // Case 3: Rating = 3.5 -> Fail hona chahiye (Decimal check)
    try {
      await Review.create({
        title: "Test Decimal Rating",
        comment: "Decimal reject hona chahiye",
        rating: 3.5,
        reviewerName: "Rahul"
      });
    } catch (err) {
      console.log("✅ Case 3 Passed (Decimal blocked):", err.message);
    }

    // Case 4: Status = blocked -> Fail hona chahiye (Enum check)
    try {
      await Review.create({
        title: "Test Invalid Status",
        comment: "Status invalid reject hona chahiye",
        rating: 4,
        reviewerName: "Rahul",
        status: "blocked"
      });
    } catch (err) {
      console.log("✅ Case 4 Passed (Invalid status blocked):", err.message);
    }

  } catch (error) {
    console.error("Test Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

testSchema();
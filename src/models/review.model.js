const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Review = model("review", reviewSchema);

module.exports = Review;

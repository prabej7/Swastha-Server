const { Router } = require("express");
const User = require("../models/user.model");
const Doctor = require("../models/doctors.model");
const Review = require("../models/review.model");

const addReview = Router();

addReview.post("/", (req, res) => {
  (async () => {
    try {
      const { review, user_id, id } = req.body;

      const user = await User.findOne({ _id: user_id });
      let entity = await Doctor.findOne({ _id: id });
      if (!entity) {
        entity = await User.findOne({ _id: id });
      }
      const newReview = new Review({
        text: review,
        user: user,
      });
      const savedReview = await newReview.save();
      entity.reviews.push(savedReview);
      await entity.save();

      return res.status(200).json({ msg: "Review addedd successfully!" });
    } catch (err) {
      return res.status(500).json({ err });
    }
  })();
});

module.exports = addReview;

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
    },
    location: {
      lon: {
        type: Number,
      },
      lat: {
        type: Number,
      },
    },
    address: {
      type: String,
    },
    documents: {
      type: [String],
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "patient",
      },
    ],
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "doctor",
      },
    ],
    fullName: {
      type: String,
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;

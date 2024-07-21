const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    present: {
      type: Boolean,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = model("doctor", doctorSchema);

module.exports = Doctor;

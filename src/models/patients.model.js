const { Schema, model } = require("mongoose");

const patientsSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
    },
    receipts: {
      type: [String],
    },
    address: {
      type: String,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
  },
  { timestamps: true }
);

const Patient = model("patient", patientsSchema);

module.exports = Patient;

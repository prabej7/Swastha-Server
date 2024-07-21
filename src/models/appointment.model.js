const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "doctor",
    },
    time: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const Appointment = model("appointment", appointmentSchema);

module.exports = Appointment;

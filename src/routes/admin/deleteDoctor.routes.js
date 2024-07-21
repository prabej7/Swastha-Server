const { Router } = require("express");
const Doctor = require("../../models/doctors.model");
const User = require("../../models/user.model");
const fs = require("fs");
const deleteDoctor = Router();

deleteDoctor.post("/", (req, res) => {
  (async () => {
    const { doctor_id, hospital_id } = req.body;
    const doctor = await Doctor.findOne({ _id: doctor_id });

    const img = doctor.img;

    await Doctor.deleteOne({ _id: doctor_id });
    await User.updateOne(
      { _id: hospital_id },
      { $pull: { doctors: doctor_id } }
    );
    fs.unlink("../backend/src/uploads/" + img, (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.status(200).json({ msg: "Doctor delete successfully!" });
  })();
});

module.exports = deleteDoctor;

const { Router } = require("express");

const addDoctor = Router();
const upload = require("../../config/multer");
const Doctor = require("../../models/doctors.model");
const User = require("../../models/user.model");
const uploadToCloud = require("../../utils/upload.utils");
addDoctor.post("/", upload.single("file"), (req, res) => {
  (async () => {
    if (!req.file) {
      return res.status(404).json({ error: "No file eas provided!" });
    }

    const { fullName, type, hospital_id } = req.body;

    const newDoctor = new Doctor({
      fullName: fullName,
      type: type,
      img: await uploadToCloud(req.file),
      hospital: hospital_id,
      present: false,
    });
    const savedDoctor = await newDoctor.save();

    const hospital = await User.findOne({ _id: hospital_id });
    hospital.doctors.push(savedDoctor);
    hospital.save();

    res.status(200).json({ msg: "Doctor added successfully!" });
  })();
});

module.exports = addDoctor;

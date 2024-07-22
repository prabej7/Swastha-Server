const { Router } = require("express");
const Patient = require("../../models/patients.model");
const User = require("../../models/user.model");
const Doctor = require("../../models/doctors.model");
const Appointment = require("../../models/appointment.model");
const upload = require("../../config/multer");
const uploadToCloud = require("../../utils/upload.utils");
const patientDetails = Router();

patientDetails.post("/", upload.single("file"), (req, res) => {
  (async () => {
    try {
      const { fullName, age, phone, hospital_id, user_id, doctor_id, type } =
        req.body;
      const doctor = await Doctor.findOne({ _id: doctor_id });
      const newPatients = new Patient({
        fullName: fullName,
        age: age,
        phone: phone,
        hospital: hospital_id,
        doctor: doctor,
      });

      if (req.file) {
        newPatients.receipts = await uploadToCloud(req.file);
      }

      const savedPatients = await newPatients.save();
      const hospital = await User.findOne({ _id: hospital_id });
      hospital.patients.push(savedPatients);
      await hospital.save();

      if (user_id && doctor_id) {
        console.log(user_id);
        const user = await User.findOne({ _id: user_id });

        const newAppointment = new Appointment({
          doctor: doctor,
          time: Date.now(),
          type: type,
        });
        const savedAppointment = await newAppointment.save();
        user.appointments.push(savedAppointment);
        await user.save();
      }

      return res.status(200).json({ msg: "Patient added successfully!" });
    } catch (error) {
      return res.status(200).json(error);
    }
  })();
});

module.exports = patientDetails;

const { Router } = require("express");
const User = require("../models/user.model");
const deleteFile = require("../utils/deleteFile.utils");
const Patient = require("../models/patients.model");
const Doctor = require("../models/doctors.model");

const deleteAccount = Router();

deleteAccount.get("/:id", (req, res) => {
  (async () => {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
        .populate("doctors")
        .populate("patients");

      const imgs = [user.dp, ...user.documents];
      if (user.doctors) {
        user.doctors.map(async (doctor) => {
          imgs.push(doctor.img);
          await Doctor.deleteOne({ _id: patient._id });
        });

        user.patients.map((patient) => {
          patient.receipts.map(async (receipt) => {
            await Patient.deleteOne({ _id: patient._id });
            imgs.push(receipt);
          });
        });
      }

      imgs.map((img) => {
        deleteFile(img);
      });

      await User.deleteOne({ _id: id });

      res.status(200).json({ msg: "Account deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })();
});

module.exports = deleteAccount;

const { Router } = require("express");
const User = require("../models/user.model");

const updateLocation = Router();

updateLocation.post("/", (req, res) => {
  (async () => {
    try {
      const { lat, lon, user_id } = req.body;
      const location = {
        lat: lat,
        lon: lon,
      };

      await User.updateOne({ _id: user_id }, { $set: { location: location } });

      res.status(200).json({ msg: "Location update successfully!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  })();
});

module.exports = updateLocation;

const mongoose = require("mongoose");

const databaseUrl = process.env.DBURL;

const connectToDatabase = async () => {
  if (databaseUrl) {
    try {
      await mongoose.connect(databaseUrl);
      console.log("Database connected successfully!");
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = connectToDatabase;

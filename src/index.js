require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectToDatabase = require("./config/db");

const register = require("./routes/register.routes");
const login = require("./routes/login.routes");
const document = require("./routes/document.routes");
const patientDetails = require("./routes/patient/patients.routes");
const getUser = require("./routes/allUser.routes");
const addDoctor = require("./routes/admin/addDoctor.routes");
const deleteDoctor = require("./routes/admin/deleteDoctor.routes");
const updateDetails = require("./routes/admin/updateDetails.routes");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Database connection
connectToDatabase();

//Routes
app.use("/register", register);
app.use("/login", login);
app.use("/upload-document", document);
app.use("/patient-details", patientDetails);
app.use("/user", getUser);
app.use("/add-doctor", addDoctor);
app.use("/delete-doctor", deleteDoctor);
app.use("/update-details", updateDetails);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const {Doctor} = require("../schema");
const connectDB = require("../db.js");
const bodyParser = require("body-parser");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Add a new doctor
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get list of all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Get a specific doctor by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });
//     res.json(doctor);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Update doctor info
router.put("/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a doctor
router.delete("/:id", async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor removed", deletedDoctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

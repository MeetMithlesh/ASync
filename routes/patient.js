const express = require("express");
const router = express.Router();
const { Patient ,Pat} = require("../schema");
const connectDB = require("../db");
const bodyParser = require("body-parser");

const insertPatientData = async () => {
  await connectDB();

  req.body = {Patient_name, Diagnosis, Procedures, Medications, Lab_tests}

  const newPatient = new Patient({
    patient_id: 15433,
    name: "Mrs Sharma",
    diagnosis: "Corona",
    procedures: ["Blood culture", "IV antibiotics"],
    medications: ["Ciprofloxacin", "Paracetamol"],
    lab_tests: ["Widal test"],
  });

  try {
    const saved = await newPatient.save();
    console.log("✅ Patient saved:", saved);
  } catch (error) {
    console.error("❌ Error saving patient:", error.message);
  }
};

router.post("/patientData", insertPatientData);

router.get("/allPatients", async (req, res) => {
  try {
    await connectDB();
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/patients/:patient_id", async (req, res) => {
  const { patient_id } = req.params;
  console.log("🔍 Incoming req.params:", patient_id);
  try {
    await connectDB();
    const patients = await Patient.find({ patient_id: patient_id });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/patients/:patient_id", async (req, res) => {
  const { patient_id } = req.params;
  console.log("🔍 Incoming req.params:", patient_id);
  try {
    await connectDB();
    const updatedPatient = await Patient.findOneAndUpdate(
      { patient_id: patient_id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/patients/:patient_id", async (req, res) => {
  const { patient_id } = req.params;
  console.log("🔍 Incoming req.params:", patient_id);
  try {
    await connectDB();
    const deletedPatient = await Patient.findOneAndDelete({
      patient_id: patient_id,
    });
    res.status(200).json(deletedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// routes/patient.js
const express = require('express');
const router = express.Router();
const connectDB = require("../db.js");
const bookedAppointmentSchema = require('../schema.js').BookedAppointment;
const bodyParser = require('body-parser');

router.get('/data', async (req, res) => {
  try {
    await connectDB();
    const patients = await bookedAppointmentSchema.find(); // fetch all
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/insert', async (req, res) => {
  const { id } = req.params;
  try {
    await connectDB();
    const appointment = new bookedAppointmentSchema({
        name: 'harsh sharma', visit_date: '25 April', status: 'paid', Procedures: [{Description: 'blood pressure', 'UnitCost': 45.5, 'TotalCost': 45.5}], Medications: [{'Description': 'Paracetron', 'UnitCost': 113.46, 'TotalCost': 113.46}, {Description: 'Azithomax', 'UnitCost': 33.38, 'TotalCost': 33.38}], LabTests: [{'Description': 'blood test', 'UnitCost': 250.0, 'TotalCost': 250.0}], GrandTotal: 442.34}
        );
        const saved = await appointment.save(); // fetch all
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

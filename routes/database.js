// Import dependencies
const express = require('express');
const router = express.Router();
const connectDB = require("../db.js");
const bodyParser = require('body-parser');
const { Patient } = require('../schema.js');


router.get('/patients/:patient_id', async (req, res) => {
    const { patient_id } = req.params;
  try {
    await connectDB();
    const patients = await Patient.find({patient_id:patient_id});
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

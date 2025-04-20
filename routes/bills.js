const express = require('express');
const router = express.Router();
const connectDB = require("../db.js");
const bodyParser = require('body-parser');
const {Bill} = require('../schema');



router.get('/:bill_id', async (req, res) => {
    const { bill_id } = req.params;
    console.log('🔍 Incoming req.params:',bill_id );
  try {
    await connectDB();
    const patients = await Bill.find({bill_id:bill_id});
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
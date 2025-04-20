const express = require('express');
const router = express.Router();
const connectDB = require('../db.js');
const {Pharmacy} = require('../schema');
const bodyParser = require('body-parser');
const {PharmacyRequest} = require('../schema');

// POST route to accept array and write to JSON file
router.post('/add-medicines',async (req, res) => {
  try {
    connectDB();
    // console.log('🔍 Incoming req.body:', req.body);
     req.body.forEach(element => {
       const newCPT = new Pharmacy({
         medicine_name:element.Medicine,
         price:element.Price,
         dosage:element.Dosage,
         IPT10_code:element.IPT10_code,
         CPD_code:element.CPD_code,
       })
       newCPT.save()
         .then(() => console.log('✅ CPT data saved:', newCPT))
         .catch((error) => console.error('❌ Error saving CPT data:', error.message));
 
        });
        
      }
      catch (error) {
        console.error('Error reading file:', error);
      }
      res.status(200).json({ message: 'CPT data inserted successfully!!!!!!!!!' });
});

// Get all pending pharmacy items
router.get('/pharmacy-requests', async (req, res) => {
  const requests = await PharmacyRequest.find({ status: 'Pending' });
  res.json(requests);
});

// Mark as dispensed
router.post('/pharmacy-requests/:id/dispense', async (req, res) => {
  await PharmacyRequest.findByIdAndUpdate(req.params.id, { status: 'Dispensed' });
  res.json({ message: 'Marked as dispensed' });
});

module.exports = router;
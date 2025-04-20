const express = require('express');
const router = express.Router();
const connectDB = require("../db.js");
const bodyParser = require('body-parser');
const {Lab} = require('../schema.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());  
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/labTest",async(req,res)  =>{
    console.log("Lab Test");
    await connectDB();
    // const labTest = Lab.find();
    const labTests = await Lab.find();
    res.json(labTests);
});

router.post('/add-lab-test', async (req, res) => {
    try {
        await connectDB();
        const data = req.body;
        console.log('🔍 Incoming req.body:', data);
        const labTest = new Lab(data);
        const savedLabTest = await labTest.save();
        res.status(201).json(savedLabTest);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
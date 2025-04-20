const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {PatientData} = require('../schema')
const connectDB = require('../db.js');
const bodyParser = require('body-parser');
const {generateToken} = require('../token')
const {generatePatientId} = require('../id')
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    try {
        connectDB();
        console.log('🔍 Incoming req.body:', req.body);
        const id = await generatePatientId();
        const {email,password ,name,gender,age,phone,role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new PatientData({ patient_id: id,email: email, password: hashedPassword ,paitent_name:name, gender:gender, age:age, phone:phone});
        await newUser.save();
        ;
        res.cookie('token', generateToken(newUser), {
            httpOnly: true,
            secure: true,
            maxAge: 60*60 * 1000, // 1 hour
        });
        alert('User registered successfully!');

        res.redirect('/patient');
    }
    catch (error) {
        console.error('❌ Error registering user:', error.message);
        res.status(500).json({ message: 'Error registering user' });
    }
}); 

router.get('/patient',(req,res) => {
    res.send('Patient page')
})

module.exports = router;
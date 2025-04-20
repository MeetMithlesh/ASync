const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {PatientData} = require('../schema')
const connectDB = require('../db.js');
const bodyParser = require('body-parser');
const {generateToken} = require('../token')

router.post('/login', async (req, res) => {
    try {
        const cookie = req.cookies.token;
        if (cookie) {
            return res.redirect('/patient');
        }

        connectDB();
        console.log('🔍 Incoming req.body:', req.body);
        const { email, password } = req.body;
        const user = await PatientData.findOne({email });
        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' });
            return res.redirect('/login');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid username or password' });
            return res.redirect('/login');
        }
        res.cookie('token', generateToken(user), {
            httpOnly: true,
            secure: true,
            maxAge: 60*60 * 1000, // 1 hour
        });
        res.status(200).json({ message: 'Login successful!' });
        res.redirect('/patient');
    } catch (error) {
        console.error('❌ Error logging in:', error.message);
        res.status(500).json({ message: 'Error logging in' });
        }
});

module.exports = router;
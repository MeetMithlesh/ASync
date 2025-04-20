const express = require('express');
const router = express.Router();
const { BookedAppointment } = require('../schema');
const connectDB = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post('/book-appointment', async (req, res) => {
    try {
        connectDB();
        console.log('🔍 Incoming req.body:', req.body);
        const { patientId, department, doctor, preferredSlot } = req.body;
        if (!patientId || !department || !doctor || !preferredSlot) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const appointment = new BookedAppointment({
            patientId: patientId,
            department: department,
            doctorId: doctor,
            timeSlot: preferredSlot,
            status: 'Pending',
        });
        await appointment.save();
        console.log('✅ Appointment saved:', appointment);
        res.status(200).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        console.error('❌ Error booking appointment:', error.message);
        res.status(500).json({ message: 'Error booking appointment' });
    }
});

router.get('/appointments', async (req, res) => {
    try {
        await connectDB();
        const appointments = await BookedAppointment.find({ status: 'Pending' });
        res.status(200).json(appointments);
    } catch (error) {
        console.error('❌ Error fetching appointments:', error.message);
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});

router.post('/appointments/:id/accept', async (req, res) => {
    try {
        await connectDB();
        const appointment = await BookedAppointment.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment accepted' });
    } catch (error) {
        console.error('❌ Error accepting appointment:', error.message);
        res.status(500).json({ message: 'Error accepting appointment' });
    }
});

router.post('/appointments/:patientId/complete', async (req, res) => {
    try {
        await connectDB();
        const appointment = await BookedAppointment.findOneAndUpdate({patientId:req.params.patientId}, { status: 'Completed' });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment completed' });
    } catch (error) {
        console.error('❌ Error completing appointment:', error.message);
        res.status(500).json({ message: 'Error completing appointment' });
    }
});

router.delete('/appointments/:patientId/cancel', async (req, res) => {
    try {
        await connectDB();
        const appointment = await BookedAppointment.findOneAndUpdate({patientId:req.params.patientId}, { status: 'Cancelled' });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment cancelled' });
    } catch (error) {
        console.error('❌ Error cancelling appointment:', error.message);
        res.status(500).json({ message: 'Error cancelling appointment' });
    }
});

router.get('/appointments/:patientId', async (req, res) => {
    try {
        await connectDB();
        const appointment = await BookedAppointment.findOne({patient_id:req.params.patientId});
        console.log('🔍 Incoming req.params:', appointment);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error('❌ Error fetching appointment:', error.message);
        res.status(500).json({ message: 'Error fetching appointment' });
    }
});

router.put('/appointments/:patientId', async (req, res) => {
    try {
        await connectDB();
        const appointment = await BookedAppointment.findOneAndUpdate({patientId:req.params.id}, req.body);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment updated' });
    } catch (error) {
        console.error('❌ Error updating appointment:', error.message);
        res.status(500).json({ message: 'Error updating appointment' });
    }
});

module.exports = router;
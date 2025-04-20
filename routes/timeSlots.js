// routes/timeslots.js
const express = require("express");
const router = express.Router();
const Appointment = require("../schema").Appointment;
const connectDB = require("../db.js");

// GET /api/timeslots/:appointmentId/:doctorId
router.get("/:appointmentId/:doctorId", async (req, res) => {
  const { name, doctorId } = req.params;
  try {
    connectDB();
    console.log("🔍 Incoming req.params:", name);
    const appointment = await Appointment.findOne(name);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doctor = appointment.doctors.find(
      (doc) => doc.doctor_id === parseInt(doctorId)
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found in this appointment" });
    }

    const timeSlots = doctor.availableSlots.timeSlots;

    const formattedSlots = Object.entries(timeSlots).map(([time, obj]) => ({
      time,
      status: obj.status,
    }));

    res.status(200).json({
      appointmentId,
      doctor: doctor.dr_name,
      timeSlots: formattedSlots,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

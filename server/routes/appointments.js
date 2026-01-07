const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define appointment schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  type: String,
  selectedDate: String,
  selectedTime: String,
  remarks: String,
  consultantId: String,
  branch: String,
  fee: Number
});

// Create model
const Appointment = mongoose.model('Appointment', appointmentSchema, 'appointments');

// POST route to save appointment
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment saved successfully' });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ message: 'Error saving appointment' });
  }
});

module.exports = router;

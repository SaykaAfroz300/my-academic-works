const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  consultantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',
    required: true,
  },
  patientName: String,
  date: String,
  time: String,
  issue: String,
  status: { type: String, default: 'pending' }, // pending, accepted, rejected etc
});

module.exports = mongoose.model('Appointment', appointmentSchema);

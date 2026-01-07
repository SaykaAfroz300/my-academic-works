const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  gender: String,
  birthdate: String,
  specialization: String,
  licenseNumber: String,
  experience: String,
  profilePhoto: String,

  documents: {
    educationalCertificates: String,
    resume: String,
    governmentID: String,
    consentForm: String,
    specializationCertificates: String,
  },

  appointments: [
    {
      patientName: String,
      patientEmail: String,
      date: String,
      time: String,
      issue: String,
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    }
  ],

  pastPatients: [
    {
      name: String,
      date: String,
      time: String,
      issue: String,
      solution: String,
      totalAppointments: Number,
    }
  ]
});

module.exports = mongoose.model('Consultant', consultantSchema);

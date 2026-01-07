const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  gender: String,
  birthdate: String,
  specialization: String,
  licenseNumber: String,
  experience: String,
  profilePhoto: String, // URL or filename for profile image

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
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
      },
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
}, { timestamps: true });

module.exports = mongoose.model('Consultant', consultantSchema);

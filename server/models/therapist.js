// models/therapist.js

const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  userType: { type: String, required: true },
  documents: {
    profilePhoto: { type: String, default: "" }
  },
  specializations: [{ type: String }],
  certificates: [{ type: String }],
  educationalCertificates: [{ type: String }],
  specializationCertificates: [{ type: String }]
});

module.exports = mongoose.model('Therapist', therapistSchema);

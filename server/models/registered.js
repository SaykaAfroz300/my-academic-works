const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    userType: { type: String, required: true, enum: ['patient', 'psychologist'] },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    birthdate: { type: String },
    specialization: { type: String },
    licenseNumber: { type: String },
    experience: { type: String },
    documents: {
        educationalCertificates: { type: String },
        resume: { type: String },
        governmentID: { type: String },
        consentForm: { type: String },
        specializationCertificates: { type: String },
        profilePhoto: { type: String }
    }
}, { timestamps: true });

const User = mongoose.model('Users', UserSchema);

module.exports = User;

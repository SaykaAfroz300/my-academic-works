const Therapist = require('../models/therapistModel'); // or adjust path to your schema

const getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find({}, 'fullName specialization experience documents.profilePhoto documents.resume documents.governmentID documents.consentForm specializations certificates educationalCertificates specializationCertificates');
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch therapists' });
  }
};

module.exports = { getAllTherapists };

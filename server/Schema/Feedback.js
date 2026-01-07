const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous"
  },
  category: {
    type: String,
    required: true,
    enum: ["Website", "Resources", "Therapist", "Psychologist", "Counselor"]
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);

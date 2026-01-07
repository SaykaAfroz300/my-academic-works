const mongoose = require("mongoose");

const moodTrackingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    mood: { type: Number, required: true },
    distraction: { type: Number, required: true },
    result: { type: String, required: true },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = moodTrackingSchema;

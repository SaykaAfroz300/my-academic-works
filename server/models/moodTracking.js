const mongoose = require("mongoose");
const moodTrackingSchema = require("../Schema/moodTrackingSchema");

const MoodTracking = mongoose.model("MoodTracking", moodTrackingSchema);

module.exports = MoodTracking;

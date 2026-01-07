const express = require('express');
const router = express.Router();
const Helpline = require('./Schema/ForHelpline'); // Import the Helpline schema

// Route to handle helpline messages
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new Helpline({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

module.exports = router;

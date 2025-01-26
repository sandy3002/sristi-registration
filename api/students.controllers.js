const express = require('express');
const router = express.Router();
const Student = require('./students.models.js'); // Import the student model

/**
 * Handler to register a student.
 */
router.post('/', async (req, res) => {
  try {
    // Log the incoming request body for debugging purposes
    console.log('Incoming registration data:', req.body);

    // Create a new student record
    const studentData = new Student({
      name: req.body.name,
      roll: req.body.roll,
      dept: req.body.dept,
      year: req.body.year,
      phone: req.body.phone,
      email: req.body.email,
      event: req.body.event,
      payment: req.body.payment,
    });

    // Save the student record to the database
    await studentData.save();

    // Send a success response
    res.status(201).json({
      message: 'Student registered successfully!',
      data: studentData,
    });
  } catch (error) {
    console.error('Error during registration:', error); // Log errors for debugging
    res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
});

/**
 * Default handler for unsupported routes within this controller.
 */
router.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found. Please check the API documentation.',
  });
});

module.exports = router;

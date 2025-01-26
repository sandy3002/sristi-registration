const express = require('express');
const dbConnect = require('./dbconnection'); // Import DB connection
const studentRoutes = require('./student.controller'); // Import student-related routes

dbConnect(); // Initialize MongoDB connection

const app = express();
app.use(express.json()); // Parse JSON requests

// Mount student routes
app.use('/api/register', studentRoutes);

// Default error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

module.exports = app;

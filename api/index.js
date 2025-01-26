const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbconnection.js");
const studentRouter = require("./studentController.js"); // Adjust the path if necessary

const app = express();
const port = 4000; // Backend port

// CORS configuration
const corsOptions = {
  origin: 'https://sristi-registration-frontend.vercel.app', // Frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Necessary headers
  credentials: true, // For cookies or authentication if needed
};

// Apply CORS middleware
app.use(cors(corsOptions)); // Automatically handles preflight and actual requests
app.options('*', cors(corsOptions)); // For explicit preflight requests

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to the database
dbConnect();

// Route setup for student-related endpoints
app.use('/', studentRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
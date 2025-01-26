const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbconnection.js");
const studentRouter = require("./studentController.js"); // Adjust the path if necessary

const app = express();
const port = 4000; // Backend port

// Dynamic CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://sristi-registration-frontend.vercel.app', // Frontend's origin
      'http://localhost:3000', // For local testing
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // For cookies or authentication
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options('*', cors(corsOptions));

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to the database
dbConnect();

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log(`Request Origin: ${req.headers.origin}`);
  next();
});

// Route setup for student-related endpoints
app.use('/', studentRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

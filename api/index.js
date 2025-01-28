const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbconnection.js");
const studentRouter = require("./studentController.js");

const app = express();
const port = 4000;

// Allowed origins for CORS
const allowedOrigins = [
  'https://sristi-registration-frontend.vercel.app',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {

    console.log(origin)
    const allowedOrigins = [
      'https://sristi-registration-frontend.vercel.app', // Frontend's origin
      'http://127.0.0.1:5500', // For local testing
      'http://127.0.0.1:5500/frontend/index.html',
      'http://localhost:4000/'
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// // Apply CORS middleware
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options('*', cors(corsOptions));
app.use(cors()); // This allows all origins (not recommended for production)


// Middleware for parsing JSON
app.use(express.json());



// Debugging middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log(`Headers:`, req.headers);
  next();
});

// Connect to the database
dbConnect();

// Route setup
app.use('/', studentRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// import dbConnect from '../dbconnection'; // Import your db connection
// import mongoose from 'mongoose';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     // Ensure MongoDB connection is established
//     await dbConnect();

//     try {
//       // Handle form data processing here
//       const { name, roll, dept, year, phone, email, event, payment } = req.body;

//       // Create a new document in your MongoDB database here
//       // Assuming you have a model named Registration
//       const newRegistration = new Registration({
//         name,
//         roll,
//         dept,
//         year,
//         phone,
//         email,
//         event,
//         payment
//       });

//       await newRegistration.save();

//       res.status(200).json({ message: 'Registration successful!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

//for debugging

module.exports = (req, res) => {
  res.status(200).json({ message: "API is working!" });
};



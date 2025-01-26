import dbConnect from '../../dbconnection'; // Adjust path if needed


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // console.log("Connecting to MongoDB...");
    // await dbConnect();
    // console.log("MongoDB connected.");

    const { name, roll, dept, year, phone, email, event, payment } = req.body;
    console.log("Request body:", req.body);

    // Validate data
    if (!name || !roll || !dept || !year || !phone || !email || !event || !payment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Saving registration...");
    const newRegistration = new Registration({ name, roll, dept, year, phone, email, event, payment });
    await newRegistration.save();
    console.log("Registration saved.");

    res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

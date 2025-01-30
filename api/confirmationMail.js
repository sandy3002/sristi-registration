require("dotenv").config();
const nodemailer = require("nodemailer");

const SendMail = async (req, res) => {
  const email = req.params.id;
  console.log("user name", process.env.SRISTI_EMAIL);
  console.log("password", process.env.SRISTI_PASSWORD);
  console.log(email);
  var transporter = nodemailer.createTransport({
    // host: "https://sristi-registration-backend.vercel.app/",
    // port: 587,
    service: "gmail",
    auth: {
      user: process.env.SRISTI_EMAIL,
      pass: process.env.SRISTI_PASSWORD,
    },
  });

  var message = {
    from: `${process.env.SRISTI_EMAIL}`,
    to: `${email}`,
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
  };
  try {
    const info = await transporter.sendMail(message);
    return res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    // If there was an error, return a failure response
    console.error("Error details:", error);  // Log the full error object
  return res.status(500).json({ error: error.message });
  }
};
module.exports = SendMail;

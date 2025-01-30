require("dotenv").config();
const nodemailer = require("nodemailer");
const qr = require("qrcode");

const generateQRCode = async (idl) => {
  try {
    const qrCodeDataURL = await qr.toDataURL(idl); // Generate QR as Base64
    return qrCodeDataURL;
  } catch (err) {
    console.error("QR Code generation failed:", err);
    return null;
  }
};

const SendMail = async (req, res) => {
  const id = req.body.id;
  const email = req.params.id;
  // console.log("user name", process.env.SRISTI_EMAIL);
  // console.log("password", process.env.SRISTI_PASSWORD);
  // console.log(email);

  const qrCodeBase64 = await generateQRCode(id);
  if (!qrCodeBase64) {
    return res.status(500).json({ error: "QR code generation failed" });
  }

  var transporter = nodemailer.createTransport({
    // host: "https://sristi-registration-backend.vercel.app/",
    // port: 587,
    service: "gmail",
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: process.env.SRISTI_EMAIL,
      pass: process.env.SRISTI_PASSWORD,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });

  var message = {
    from: `${process.env.SRISTI_EMAIL}`,
    to: `${email}`,
    subject: "Message title",
    text: "Plaintext version of the message",
    html: `<p>Here is your QR Code: <br> Save it for event days`,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeBase64.split("base64,")[1], // Remove data URI prefix
        encoding: "base64",
      },
    ],
  };
  try {
    const info = await transporter.sendMail(message);
    return res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    // If there was an error, return a failure response
    console.error("Error details:", error); // Log the full error object
    return res.status(500).json({ error: error.message });
  }
};
module.exports = SendMail;

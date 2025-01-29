const sendgridMail = require("@sendgrid/mail");

// Set the SendGrid API Key from environment variables
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

const SendMail = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract email from body or query parameters
  const email = req.params.id;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required in request body or query parameter' });
  }

  console.log("Email:", email);
  console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY ? "SET" : "NOT SET");
  console.log("Sender Email:", process.env.SRISTI_EMAIL);

  // Email options
  const msg = {
    to: email,  // Recipient email
    from: process.env.SRISTI_EMAIL,  // Sender email (must be verified in SendGrid)
    subject: "This is a test email",
    text: "Hello world",  // Plain text email
    html: `<p>This is a test message</p>`,  // HTML email
  };

  try {
    // Send email through SendGrid
    await sendgridMail.send(msg);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('SendGrid error:', error.response ? error.response.body : error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = SendMail;
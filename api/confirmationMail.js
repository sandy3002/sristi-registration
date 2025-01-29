const sendgridMail = require("@sendgrid/mail");
const cors = require("cors");

// Dynamic CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);
    const allowedOrigins = [
      'https://sristi-registration-frontend.vercel.app', // Frontend's origin
      'https://sristi-registration-frontend.vercel.app/', // Frontend's origin
      'http://127.0.0.1:5500', // For local testing
      'http://127.0.0.1:5500/frontend/index.html',
      'http://localhost:4000/'
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Set the SendGrid API Key
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
    to: email,
    from: process.env.SRISTI_EMAIL,
    subject: "This is a test email",
    text: "Hello world",
    html: `<p>This is a test message</p>`,
  };

  try {
    await sendgridMail.send(msg);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('SendGrid error:', error.response ? error.response.body : error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = SendMail;
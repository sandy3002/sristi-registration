require('dotenv').configDotenv;
const nodemailer = require('nodemailer');

const SendMail=(req,res)=>{
    const email=req.params.id;
    console.log("user name",process.env.SRISTI_EMAIL);
    console.log("password",process.env.SRISTI_PASSWORD);
    console.log(email);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SRISTI_EMAIL,
          pass: process.env.SRISTI_PASSWORD,
        }
      });
      
      var message = {
          from: `${process.env.SRISTI_EMAIL}`,
          to: `${email}`,
          subject: "Message title",
          text: "Plaintext version of the message",
          html: "<p>HTML version of the message</p>",
        };
      
        transporter.sendMail(message, (error, info) => {
          if (error) {
              console.log('Error:', error);
          } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({message:"success"})
          }
      });
}

module.exports=SendMail
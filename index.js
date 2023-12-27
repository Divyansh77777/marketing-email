const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config()
const app = express();



app.use(cors());

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// POST endpoint to handle email submission
app.post('/send-email', (req, res) => {
    const { subject, emails } = req.body;

    // For demonstration purposes, log the received data
    console.log('Received Email Data:');
    console.log('Subject:', subject);
    console.log('Emails:', emails);

    // Add your email sending logic here


    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.email,
            pass: process.env.password,
        },
    });

    const senderName = 'Zexweb Technologies';
    const senderEmail = 'developer1@zexweb.com';



    for (const receiver of emails) {

        const mailOptions = {
            from: `"ZexWeb Technologies" <${senderEmail}>`,
            to: receiver,
            subject: subject,
            text: 'Your One-Stop Shop for Digital Marketing Services',
            html: `
            <a href="http://www.zexweb.com" target="_blank" style="display: block; max-width: 100%;">
            <img src="https://www.zexweb.com/static/media/marketing.png" alt="Clickable Image" style="width: 100%; height: auto;">
        </a>
        `
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error, receiver);
            } else {
                console.log('Email sent:', info.response, receiver);
            }
        });


    };


    // Respond to the client
    res.status(200).json({ message: 'Email received successfully' });
});

// Start the server
app.listen(process.env.port, () => {
    console.log(`Server is running on http://localhost:`+process.env.port);
});

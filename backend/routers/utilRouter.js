const nodemailer = require("nodemailer");
const express = require('express');
require('dotenv').config();
const generatedOTP = {};

const router = express.Router();

const getOTPTemplate = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <h1>Your OTP of Resetting Password is : ${otp}</h1>

</body>
</html>`
}

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
    },
});

function generateNewOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendMail = async (mailDetails, callback) => {
    try {
        const info = await transporter.sendMail(mailDetails)
        callback(info);
    } catch (error) {
        console.log(error);
    }
};

router.post('/send-otp', (req, res) => {

    const { recipient } = req.body;
    const otp = generateNewOTP();
    generatedOTP[recipient] = otp;

    const mailDetails = {
        from: process.env.EMAIL_ID,
        to: recipient,
        subject: 'OTP for new password',
        html: getOTPTemplate(otp)
    }

    sendMail(mailDetails, (info) => {
        res.status(200).json(info);
    })

})

module.exports = router;
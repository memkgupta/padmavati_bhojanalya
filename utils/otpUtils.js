const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator'); // for generating OTPs
const { sendMail } = require("./mailUtils");


function sendOTP(mail){
    const OTP = otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
    
    const body = `<html>
    <head>
        <title>OTP Email</title>
    </head>
    <body>
        <div style="background-color: #f4f4f4; padding: 20px;">
            <h2>Your One-Time Password (OTP)</h2>
            
            <p>Your OTP for authentication is: <strong>${OTP}</strong></p>
            <p>This OTP is valid for a short duration. Please do not share it with anyone for security reasons.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Thank you for using our service.</p>
        </div>
    </body>
    </html>`
    
    sendMail(mail,body,"OTP FOR YOUR ACCOUNT VERIFICATION - PADMAVATI BHOJANALYA").then((info)=>{

    }).catch((err)=>{
        throw new Error(err.message);
    })
    return OTP;
}

module.exports = {sendOTP};






const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });
 function sendMail(mail,body,subject){
return new Promise((resolve,reject)=>{
    transporter.sendMail({
        to:mail,
        subject:subject,
        html:body
    }).then((info)=>{
        resolve(info);
    }).catch((err)=>{
        reject(err);
    })
})
    
  }


  module.exports = {sendMail}
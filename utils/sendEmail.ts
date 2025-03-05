import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import { IemailMessage } from '@/types/emailTypes';

dotenv.config()


// send mail function
export default async function sendMail(config: IemailMessage) {
  const { from, subject, text, html } = config;
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });


  let mailOptions = {
    from: from, 
    to: process.env.EMAIL, 
    subject, 
    text,
    html,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    return info
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

const nodemailer = require('nodemailer');
require('dotenv').config(); 
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

// Configuration du transporteur pour envoyer des mails
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Fonction pour envoyer l'email de confirmation
const sendConfirmationEmailToTeacher = async (email, fullName, course_name, start_date, end_date) => {
  try {
    await transporter.sendMail({
      from: `"Signolib" <${process.env.EMAIL_USER}>`, 
      to: email, 
      subject: 'Module Evaluation Period Now Open', 
      html: `
        <p>Dear ${fullName},</p>
        <p>We are pleased to inform you that the evaluation for your module(s) is now open for students to provide their feedback. This process is designed to gather valuable insights to help enhance the learning experience.</p>
        <p><strong>Module(s):</strong><br>${course_name}</p>
        <p><strong>Key Details:</strong></p>
        <ul>
          <li><strong>Evaluation Period:</strong> From ${start_date} to ${end_date}</li>
          <li><strong>Target Response Rate:</strong> 100% participation</li>
          <li><strong>Feedback Confidentiality:</strong> All responses are anonymous</li>
        </ul>
        <p>Thank you for your commitment to improving the learning experience at EFREI.</p>
        <p>Best regards,<br>Signolib</p>
      `, 
    });

    console.log('Email de confirmation envoyé à :', email);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw new Error('Impossible d\'envoyer l\'email de confirmation.');
  }
};

module.exports = { sendConfirmationEmailToTeacher };

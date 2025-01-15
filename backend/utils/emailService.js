const nodemailer = require('nodemailer');
require('dotenv').config(); 
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

// Configuration du transporteur pour envoyer des mails
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Fonction pour envoyer l'email de confirmation
const sendConfirmationEmail = async (email, fullName, course_name) => {
  try {
    await transporter.sendMail({
      from: `"Signolib" <${process.env.EMAIL_USER}>`, 
      to: email, 
      subject: 'You have been invited to provide feedback for EFREI', 
      text: `You have been invited to provide feedback for EFREI`, 
      html: `
        <h2>From ${fullName}<h2> 
        <p>Dear Students</p> 
        <p>Your feedback matters! <br/>Target : 100% respondents. Your opinion is important! <br/>You have been invited to complete confidential evaluations for the Module(s) listed below: </p>
        <h2>${course_name}</h2>
      `, 
    });

    console.log('Email de confirmation envoyé à :', email);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw new Error('Impossible d\'envoyer l\'email de confirmation.');
  }
};

module.exports = { sendConfirmationEmail };

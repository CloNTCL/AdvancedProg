const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'name@gmail.com', // Replace by your gmail, later this will be the admin's email
        pass: 'app_password' // Replace my a gmail app password, info sur les app passwords: https://support.google.com/mail/answer/185833?hl=en
    }
});

// Define the function to send reminder emails
const sendReminderEmail = async (recipientEmail, studentName, courseName) => {
    try {
        // Email content
        const mailOptions = {
            from: "name@gmail.com", // `"Course Evaluations" <${process.env.EMAIL_USER}>`, Remplacer avec l'email de l'admin
            to: recipientEmail,
            subject: `Reminder to Fill Evaluation for ${courseName}`,
            text: `Hello ${studentName},\n\nThis is a friendly reminder to fill the evaluation form for the module "${courseName}". Your feedback is valuable to us!\n\nBest regards,\nYour University Team`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
    }
};

// Example usage
sendReminderEmail('firstname.lastname@efrei.net', 'firstname lastname', 'Advanced Programming');
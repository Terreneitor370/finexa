const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (name, email) => {
  const mailOptions = {
    from: `"Finexa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Bienvenido a Finexa',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Bienvenido a Finexa, ${name}</h2>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <p>Ya puedes empezar a registrar tus gastos y tomar control de tus finanzas.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0;" />
        <p style="color: #888; font-size: 12px;">Si no creaste esta cuenta, ignora este mensaje.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };
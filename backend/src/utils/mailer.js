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

const sendResetEmail = async (name, email, resetLink) => {
  const mailOptions = {
    from: `"Finexa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Recuperación de contraseña - Finexa',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">Recupera tu contraseña, ${name}</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente botón para crear una nueva contraseña. Este enlace expira en 1 hora.</p>
        <a href="${resetLink}" 
           style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">
          Restablecer contraseña
        </a>
        <hr style="border: none; border-top: 1px solid #e0e0e0;" />
        <p style="color: #888; font-size: 12px;">Si no solicitaste este cambio, ignora este mensaje. Tu contraseña no será modificada.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail, sendResetEmail };
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async ({ subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject,
      text,
      html,
    });
  } catch (err) {
    
    console.error("Failed to send email:", err.message);
  }
};

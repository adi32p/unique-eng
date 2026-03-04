const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (to, subject, htmlContent) => {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"Unique EPC" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};
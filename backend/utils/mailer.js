const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (to, subject, htmlContent) => {
  try {
    console.log("Sending email to:", to);

    await sgMail.send({
      to,
      from: process.env.EMAIL_USER, // Must be verified sender
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("EMAIL ERROR:", error.response?.body || error);
    throw error;
  }
};
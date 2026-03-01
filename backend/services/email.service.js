const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendExpiryEmail = async (license, daysLeft) => {
  await transporter.sendMail({
    from: `"Compliance Team" <${process.env.EMAIL_USER}>`,
    to: license.userEmail,
    subject: `License Expiry Reminder - ${daysLeft} Days Left`,
    html: `
      <h2>License Expiry Reminder</h2>
      <p>Your license <strong>${license.name}</strong> 
      issued by ${license.authority} 
      will expire in <strong>${daysLeft} days</strong>.</p>
      <p>Expiry Date: ${license.validTill.toDateString()}</p>
      <br/>
      <p>Please renew before expiry.</p>
    `,
  });
};

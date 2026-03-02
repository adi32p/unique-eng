const cron = require("node-cron");
const UserService = require("../models/userService");
const { sendEmail } = require("../utils/mailer"); // ✅ correct file

function getDaysLeft(today, expiryDate) {
  const start = new Date(today.setHours(0, 0, 0, 0));
  const end = new Date(new Date(expiryDate).setHours(0, 0, 0, 0));
  const diff = end - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ✅ RUN DAILY AT 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("🔁 Running Service Expiry Reminder Job...");

  try {
    const today = new Date();

    const services = await UserService.find({
      status: "Completed",
      expiryDate: { $ne: null },
    }).populate("user service");

    for (let item of services) {
      const daysLeft = getDaysLeft(today, item.expiryDate);

      const reminderDays = [60, 30, 15];

      if (reminderDays.includes(daysLeft)) {
        // ✅ prevent duplicate
        if (!item.reminderSent.includes(daysLeft)) {
          const subject = `Service Expiry Reminder - ${daysLeft} Days Left`;

          const message = `
Hello ${item.user.name},

Your service "${item.service.title}" will expire in ${daysLeft} days.

Expiry Date: ${item.expiryDate.toDateString()}

Please renew it before expiry.

Regards,
Unique EPC Team
`;

          await sendEmail(item.user.email, subject, message);

          // Save reminder history
          item.reminderSent.push(daysLeft);
          await item.save();

          console.log(
            `📧 Reminder sent to ${item.user.email} - ${daysLeft} days left`
          );
        }
      }
    }
  } catch (error) {
    console.error("❌ Expiry Reminder Error:", error);
  }
});
const cron = require("node-cron");
const UserService = require("../models/userService");
const { sendEmail } = require("../utils/mailer");
const { createNotification } = require("../services/notification.service");

cron.schedule("0 0 * * *", async () => {
  console.log("Running Service Expiry Reminder Job...");

  const services = await UserService.find({
    status: "Completed",
    expiryDate: { $ne: null },
  }).populate("user service");

  for (let s of services) {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const expiryDate = new Date(s.expiryDate);
    expiryDate.setHours(0, 0, 0, 0);

    const diff = Math.floor(
      (expiryDate - todayDate) / (1000 * 60 * 60 * 24)
    );

    let reminderType = null;

    if (diff === 60 && !s.reminder60Sent) {
      reminderType = "60";
      s.reminder60Sent = true;
    }

    if (diff === 30 && !s.reminder30Sent) {
      reminderType = "30";
      s.reminder30Sent = true;
    }

    if (diff === 15 && !s.reminder15Sent) {
      reminderType = "15";
      s.reminder15Sent = true;
    }

    if (reminderType) {
      const message = `Reminder: Your service "${s.service.title}" will expire in ${diff} days. Please renew before expiry.`;

      await sendEmail(
        s.user.email,
        "Service Expiry Reminder",
        message
      );

      await createNotification(s.user._id, message);

      await s.save();

      console.log(
        `Reminder ${reminderType} days sent to ${s.user.email}`
      );
    }

    // Optional: Auto mark expired
    if (diff < 0 && s.status !== "Expired") {
      s.status = "Expired";

      const message = `Your service "${s.service.title}" has expired. Please renew to continue.`;

      await sendEmail(
        s.user.email,
        "Service Expired",
        message
      );

      await createNotification(s.user._id, message);

      await s.save();

      console.log(`Service expired for ${s.user.email}`);
    }
  }
});
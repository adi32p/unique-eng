const cron = require("node-cron");
const UserService = require("../models/userService");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

function daysBetween(date1, date2) {
  const diffTime = date2 - date1;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Run once every day at 9:00 AM
cron.schedule("0 9 * * *", async () => {
  console.log("🔁 Running expiry reminder job...");

  const today = new Date();

  try {
    const services = await UserService.find({
      status: "Completed",
      expiryDate: { $ne: null },
    }).populate("user service");

    for (let item of services) {
      const daysLeft = daysBetween(today, item.expiryDate);

      if ([60, 30, 15].includes(daysLeft)) {
        await sendEmail({
          to: item.user.email,
          subject: `Service Expiry Reminder`,
          html: `
            <h2>Hello ${item.user.name},</h2>
            <p>Your service <b>${item.service.title}</b> will expire in <b>${daysLeft} days</b>.</p>
            <p>Expiry Date: ${item.expiryDate.toDateString()}</p>
            <p>Please renew before expiry to avoid interruption.</p>
          `,
        });

        console.log(
          `📧 Reminder sent to ${item.user.email} - ${daysLeft} days left`
        );
      }
    }
  } catch (error) {
    console.error("Expiry Reminder Error:", error);
  }
});
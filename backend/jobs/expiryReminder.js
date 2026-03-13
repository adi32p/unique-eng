const cron = require("node-cron");
const UserService = require("../models/userService");
const { sendExpiryEmail } = require("../services/email.service");// ✅ correct file

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
          if (!item.reminderSent.includes(daysLeft)) {

            await sendExpiryEmail(
              {
                userEmail: item.user.email,
                name: item.service.title,
                authority: "Unique EPC",
                validTill: item.expiryDate,
              },
              daysLeft
            );

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
  }
  ,
  {
    timezone: "Asia/Kolkata",
  }
);
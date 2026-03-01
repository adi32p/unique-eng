const cron = require("node-cron");
const License = require("../models/License");
const { sendExpiryEmail } = require("../services/email.service");

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily license expiry check...");

  const licenses = await License.find();

  const today = new Date();

  for (const license of licenses) {
    const diffTime = new Date(license.validTill) - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft === 30 && !license.reminder30Sent) {
      await sendExpiryEmail(license, 30);
      license.reminder30Sent = true;
      await license.save();
    }

    if (daysLeft === 15 && !license.reminder15Sent) {
      await sendExpiryEmail(license, 15);
      license.reminder15Sent = true;
      await license.save();
    }

    if (daysLeft === 7 && !license.reminder7Sent) {
      await sendExpiryEmail(license, 7);
      license.reminder7Sent = true;
      await license.save();
    }
  }
});

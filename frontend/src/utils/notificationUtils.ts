export function getDaysLeft(validTill: string) {
  const today = new Date();
  const expiry = new Date(validTill);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function generateLicenseNotifications(licenses: any[]) {
  const notifications: any[] = [];

  licenses.forEach((license) => {
    const daysLeft = getDaysLeft(license.validTill);

    if ([30, 15, 7].includes(daysLeft)) {
      notifications.push({
        id: `${license.id}-${daysLeft}`,
        title: "License Expiry Alert",
        message: `${license.name} will expire in ${daysLeft} days. Please renew.`,
        type: "warning",
        time: "Just now",
        read: false,
      });
    }
  });

  return notifications;
}

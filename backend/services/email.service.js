const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendExpiryEmail = async (license, daysLeft) => {
  await sgMail.send({
    to: license.userEmail,
    from: process.env.EMAIL_USER,
    subject: `License Expiry Reminder – ${daysLeft} Day${daysLeft > 1 ? "s" : ""} Remaining`,
    html: `
    <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" 
              style="background:#ffffff;margin-top:30px;border-radius:8px;
              overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

              <!-- Header -->
              <tr>
                <td style="background:#1e293b;padding:20px;text-align:center;
                color:#ffffff;font-size:20px;font-weight:bold;">
                  License Expiry Reminder
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px;color:#333;font-size:15px;line-height:1.6;">

                  <p>Dear Client,</p>

                  <p>
                    This is a reminder that your license 
                    <strong>${license.name}</strong> issued by 
                    <strong>${license.authority}</strong> 
                    is set to expire soon.
                  </p>

                  <table width="100%" style="margin:20px 0;border-collapse:collapse;">
                    <tr>
                      <td style="padding:8px 0;"><strong>Days Remaining:</strong></td>
                      <td style="padding:8px 0;color:${
                        daysLeft <= 7 ? "red" : "#333"
                      };font-weight:bold;">
                        ${daysLeft} Day${daysLeft > 1 ? "s" : ""}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;"><strong>Expiry Date:</strong></td>
                      <td style="padding:8px 0;">
                        ${license.validTill.toDateString()}
                      </td>
                    </tr>
                  </table>

                  <p>
                    To avoid penalties, service disruption, or legal complications,
                    we recommend initiating the renewal process immediately.
                  </p>

                  ${
                    daysLeft <= 7
                      ? `
                      <p style="color:red;font-weight:bold;">
                        ⚠️ Urgent: Your license is nearing expiry.
                      </p>
                      `
                      : ""
                  }

                  <p>
                    If you require assistance with renewal, our compliance team is ready to help.
                  </p>

                  <p>
                    Regards,<br/>
                    <strong>Compliance Support Team</strong><br/>
                    Unique Engineering Consultancy
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f1f5f9;padding:15px;text-align:center;
                font-size:12px;color:#666;">
                  © ${new Date().getFullYear()} Unique Engineering Consultancy. 
                  All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
    `,
  });
};
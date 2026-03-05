const User = require("../models/User");
const Service = require("../models/Service");
const Request = require("../models/Request");
const License = require("../models/License");
const UserService = require("../models/userService");
// ✅ MOVE THESE HERE (TOP)
const { sendEmail } = require("../utils/mailer");
const { createNotification } = require("../services/notification.service");

exports.getDashboardStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Active services
    const activeServices = await Service.countDocuments({
      status: "active",
    });

    // Pending requests
    const pendingRequests = await Request.countDocuments({
      status: "Pending",
    });

    // Expiring licenses (within 30 days)
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const expiringLicenses = await License.countDocuments({
      expiryDate: { $gte: today, $lte: next30Days },
    });

    res.json({
      totalUsers,
      activeServices,
      pendingRequests,
      expiringLicenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


exports.assignService = async (req, res) => {
  const { userId, serviceId } = req.body;

  const assignment = await UserService.create({
    user: userId,
    service: serviceId,
  });

  res.json({ message: "Service assigned successfully" });
};

/* ======================================================
   GET SERVICES OF SPECIFIC USER (ADMIN)
====================================================== */
exports.getServicesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const services = await UserService.find({ user: userId })
      .populate("service")
      .populate("user", "name email");

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   UPDATE SERVICE STAGE (ADMIN)
====================================================== */
exports.updateServiceStage = async (req, res) => {
  try {
    const io = req.app.get("io"); // ✅ GET SOCKET INSTANCE

    const { serviceId } = req.params;
    const { stage, expiryDate } = req.body;

    const stageMap = {
      "request-approved": 25,
      "application-submitted": 50,
      "documents-submitted": 75,
      "payment-done": 90,
      "license-completed": 100,
    };

    const userService = await UserService.findById(serviceId)
      .populate("user")
      .populate("service");

    if (!userService) {
      return res.status(404).json({ message: "Service not found" });
    }

    userService.stage = stage;
    userService.progress = stageMap[stage] || userService.progress;

    /* ======================================================
       IF SERVICE COMPLETED
    ====================================================== */
    if (stage === "license-completed") {
      if (!expiryDate) {
        return res.status(400).json({
          message: "Expiry date is required when completing service",
        });
      }

      userService.status = "Completed";
      userService.completedAt = new Date();
      userService.expiryDate = new Date(expiryDate);

      // ✅ SERVICE COMPLETED NOTIFICATION
      await createNotification(
        userService.user._id,
        {
          title: "Service Completed",
          message: `Your service "${userService.service.title}" has been completed successfully.`,
          type: "success",
        },
        io
      );
    } else {
      userService.status = "In Progress";
    }

    await userService.save();

    /* ======================================================
       PROGRESS UPDATE EMAIL + NOTIFICATION
    ====================================================== */
    const message = `Your service "${userService.service.title}" is now ${userService.progress}% completed.`;

    // ✅ Send Email
    const subject = `Update on Your ${userService.service.title} Service`;

    const emailBody = `
      <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin-top:30px;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                
                <!-- Header -->
                <tr>
                  <td style="background:#1e293b;padding:20px;text-align:center;color:#ffffff;font-size:20px;font-weight:bold;">
                    Unique Engineering Consultancy
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px;color:#333333;font-size:15px;line-height:1.6;">
                    
                    <p>Dear <strong>${userService.user.name}</strong>,</p>

                    <p>
                      We would like to inform you that your service 
                      <strong>${userService.service.title}</strong> has been updated.
                    </p>

                    <table width="100%" style="margin:20px 0;border-collapse:collapse;">
                      <tr>
                        <td style="padding:8px 0;"><strong>Status:</strong></td>
                        <td style="padding:8px 0;">${userService.status}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;"><strong>Progress:</strong></td>
                        <td style="padding:8px 0;">${userService.progress}%</td>
                      </tr>
                    </table>

                    ${stage === "license-completed"
        ? `
                          <p style="color:green;font-weight:bold;">
                            🎉 Your service has been successfully completed.
                          </p>
                          <p>
                            <strong>Completion Date:</strong> ${new Date().toLocaleDateString()}<br/>
                            <strong>Expiry Date:</strong> ${new Date(userService.expiryDate).toLocaleDateString()}
                          </p>
                        `
        : `
                          <p>
                            Our team is actively working on your service.
                            We will notify you as soon as the next stage is completed.
                          </p>
                        `
      }

                    <p>
                      If you have any questions, please contact our support team.
                    </p>

                    <p>
                      Regards,<br/>
                      <strong>Compliance Support Team</strong>
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;color:#666;">
                    © ${new Date().getFullYear()} Unique Engineering Consultancy. All rights reserved.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `;

    sendEmail(
      userService.user.email,
      subject,
      emailBody
    ).catch(err => {
      console.error("❌ EMAIL ERROR:");
      console.error(err.response?.body || err.message || err);
    });


    // ✅ Real-time Notification
    await createNotification(
      userService.user._id,
      {
        title: "Service Progress Updated",
        message,
        type: userService.progress === 100 ? "success" : "info",
      },
      io
    );

    res.json({
      message: "Stage updated successfully",
      userService,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
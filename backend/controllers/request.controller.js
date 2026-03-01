// const Request = require("../models/Request");
// const Service = require("../models/Service");
// const UserService = require("../models/userService");

// /* 🔹 Create Request (Public User) */
// exports.createRequest = async (req, res) => {
//   try {
//     const { name, email, phone, service } = req.body;

//     if (!name || !email || !phone || !service) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Validate service ObjectId exists
//     const serviceExists = await Service.findById(service);
//     if (!serviceExists) {
//       return res.status(400).json({ message: "Invalid service selected" });
//     }

//     const request = await Request.create({
//       name,
//       email,
//       phone,
//       service,
//     });

//     res.status(201).json({
//       message: "Request submitted successfully",
//       request,
//     });
//   } catch (error) {
//     console.error("Create Request Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// /* 🔹 Get All Requests (Admin) */
// exports.getRequests = async (req, res) => {
//   try {
//     const requests = await Request.find().populate("service");

//     res.json(requests);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// /* 🔹 Update Status (Approve / Reject) */
// exports.updateRequestStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["Approved", "Rejected"].includes(status)) {
//       return res.status(400).json({
//         message: "Invalid status value",
//       });
//     }

//     const request = await Request.findById(req.params.id);

//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     // Update request status
//     request.status = status;
//     await request.save();

//     // If approved → create UserService
//     if (status === "Approved") {
//       const user = await User.findOne({ email: request.email });

//       if (!user) {
//         return res.status(400).json({
//           message: "No registered user found with this email",
//         });
//       }

//       const alreadyAssigned = await UserService.findOne({
//         user: user._id,
//         service: request.service,
//       });

//       if (!alreadyAssigned) {
//         await UserService.create({
//           user: user._id,
//           service: request.service,
//           status: "Pending", // keep lowercase (consistent with schema)
//           progress: 0,
//         });
//       }
//     }

//     res.json({
//       message: "Status updated successfully",
//       request,
//     });
//   } catch (error) {
//     console.error("Update Status Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.getRequestById = async (req, res) => {
//   try {
//     const request = await Request.findById(req.params.id).populate("service");

//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     res.json(request);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };


const Request = require("../models/Request");
const Service = require("../models/Service");
const UserService = require("../models/userService");

/* ======================================================
   CREATE REQUEST (Logged-in User)
====================================================== */
exports.createRequest = async (req, res) => {
  try {
    const { name, email, phone, service } = req.body;

    if (!name || !email || !phone || !service) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const serviceExists = await Service.findById(service);
    if (!serviceExists) {
      return res.status(400).json({ message: "Invalid service selected" });
    }

    const request = await Request.create({
      name,
      email,
      phone,
      service,
      user: req.user._id, // 🔥 SAVE LOGGED-IN USER ID
      status: "Pending",
    });

    res.status(201).json({
      message: "Request submitted successfully",
      request,
    });
  } catch (error) {
    console.error("Create Request Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET ALL REQUESTS (Admin)
====================================================== */
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("service")
      .populate("user");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   UPDATE REQUEST STATUS (Admin Approve/Reject)
====================================================== */
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    /* 🔥 IF APPROVED → CREATE USER SERVICE */
    if (status === "Approved") {
      const userId = request.user;

      if (!userId) {
        return res.status(400).json({
          message: "Request is not linked to a user",
        });
      }

      const alreadyAssigned = await UserService.findOne({
        user: userId,
        service: request.service,
      });

      if (!alreadyAssigned) {
        await UserService.create({
          user: userId,
          service: request.service,
          stage: "request-approved",
          progress: 25,
          status: "In Progress",
        });
      }
    }

    res.json({
      message: "Status updated successfully",
      request,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET REQUEST BY ID (Admin)
====================================================== */
exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("service")
      .populate("user");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
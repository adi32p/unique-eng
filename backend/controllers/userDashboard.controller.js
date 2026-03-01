// const UserService = require("../models/userService");

// exports.getDashboardStats = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const services = await UserService.find({ user: userId });

//     const totalServices = services.length;
// // 
//     let totalProgress = 0;
//     services.forEach((s) => {
//       totalProgress += s.progress;
//     });

//     const averageProgress =
//       totalServices > 0
//         ? Math.round(totalProgress / totalServices)
//         : 0;

//     res.json({
//       myServices: totalServices,
//       serviceProgress: averageProgress,
//       documents: 0,
//       notifications: 0,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Dashboard error" });
//   }
// };


const UserService = require("../models/userService");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const services = await UserService.find({ user: userId });

    const totalServices = services.length;

    let totalProgress = 0;

    services.forEach((service) => {
      totalProgress += service.progress;
    });

    const averageProgress =
      totalServices > 0
        ? Math.round(totalProgress / totalServices)
        : 0;

    res.json({
      myServices: totalServices,
      serviceProgress: averageProgress,
      documents: 0,
      notifications: 0,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Dashboard error" });
  }
};
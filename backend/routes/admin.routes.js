const express = require("express");
const router = express.Router();
const { getDashboardStats, getAllUsers, getServicesByUser, updateServiceStage } = require("../controllers/admin.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const { isAdmin } = require("../middleware/admin.middleware");

router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/users", protect, isAdmin, getAllUsers);
router.get(
  "/users/:userId/services",
  protect,
  isAdmin,
  getServicesByUser
);

/* UPDATE stage */
router.put(
  "/user-service/:serviceId/stage",
  protect,
  isAdmin,
  updateServiceStage
);

module.exports = router;

const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/userDashboard.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getDashboardStats);

module.exports = router;
